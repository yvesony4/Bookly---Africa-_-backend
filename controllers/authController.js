import User from "../models/User.js";
import bcrypt from "bcrypt";
import createError from "../utils/error.js";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import speakeasy from "speakeasy";
import crypto from "crypto";
import validatePassword from "../utils/passwordValidator.js";

// Create a transporter using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "mail.bookly.africa",
  port: 465,
  secure: true,
  auth: {
    user: "noreply@bookly.africa",
    pass: "9o@&favthI~B",
  },
});

export const register = async function (req, res, next) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Validate the new password.
    /* check this use case later
    if (!validatePassword(hash)) {
      return res.status(400).json({
        message:
          "at least 8 characters - capital letter - small letter - symbol.",
      });
    } */

    const otp = speakeasy.totp({
      secret: speakeasy.generateSecret().base32,
      encoding: "base32",
    });
    const newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      role: "Normal",
      otp: otp,
    });

    await newUser.save();
    res
      .status(200)
      .json({ responseCode: 200, message: "User created successfully" });

    if (res.status(200)) {
      // Email content
      const mailOptions = {
        from: "noreply@bookly.africa", // Sender address
        to: req.body.email, // List of recipients
        subject: "Bookly Africa Account registration confirmation", // Subject line
        html:
          "<b>Hello from Bookly Africa,</b> <br/>  <p>Thanks for creating an account with us and we are excited to have you onboard. <br/><br/> Please enter the below OTP to confirm your account: <br/> <b><i>OTP: " +
          otp +
          "</i></b> </p> <br/> Regards, <br/> Bookly Team", // HTML body
        // text: "Hello from Bookly Africa, <b> This is to confirm your email after successful registration on our platform!", // Plain text body
      };
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("========Error sending email:", error);
        } else {
          console.log("*************Email sent:", info.response);
        }
      });
    }
    // res.status(200).send("User created successfully");
  } catch (err) {
    next(err);
  }
};

export const validateOTP = async function (req, res, next) {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(createError(404, "User not found"));
  } else {
    const otp = req.body.otp;
    if (user.otp === otp) {
      user.validated = true;
      user.otp = null;
      await User.findByIdAndUpdate(
        user.id,
        {
          $set: user,
        },
        {
          new: true,
        }
      );
      const responseData = {
        message: "User validated successfully",
        data: {
          username: user.username,
          email: user.email,
          validated: user.validated,
        },
      };
      res.status(200).json(responseData);
    } else {
      const failureData = {
        message: "Invalid OTP, try again!",
        data: {
          email: user.email,
          validated: user.validated,
        },
      };
      res.status(504).json(failureData);
    }
  }
};

export const login = async function (req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong username or password!"));

    if (user.validated != true) {
      return next(createError(400, "Account email not validated"));
    }

    const token = Jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_secret
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

export const logout = async function (_req, res, next) {
  try {
    // Delete the access_token cookie to log the user out
    res.cookie("access_token", "", { maxAge: 1 });
    // Send a 200 response with a success message
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    res.status(500).json({ message: "An unexpected error occurred" });
    // Pass any errors to the next middleware
    next(err);
  }
};

export const googleSuccess = async function (req, res, next) {
  res.send("Logged in Via Google");
};

function generateToken() {
  return crypto.randomBytes(20).toString("hex");
}

function sendResetEmail(email, token) {
  const mailOptions = {
    from: "noreply@bookly.africa",
    to: email,
    subject: "Password Reset Request",
    text:
      `Hello Bookly User, \n\n You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
      `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
      `http://localhost:3000/reset/${token}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };
  return transporter.sendMail(mailOptions);
}

// Route for initiating the password reset process.
export const forgot_password = async function (req, res, next) {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(createError(404, "User not found"));
  } else {
    // Generate a reset token and set the token expiration time.
    const token = generateToken();
    const tokenExpiration = Date.now() + 3600000; // Token valid for 1 hour.

    // Update the user's reset token and reset token expiration time in the database.
    user.resetToken = token;
    user.resetTokenExpiration = tokenExpiration;
    await User.findByIdAndUpdate(
      user.id,
      {
        $set: user,
      },
      {
        new: true,
      }
    );
    // Send the reset email with the token.
    sendResetEmail(user.email, token)
      .then(() => {
        return res
          .status(200)
          .json({ message: "Reset email sent successfully." });
      })
      .catch((error) => {
        console.error("Error sending reset email:", error);
        return res.status(500).json({ message: "Error sending reset email." });
      });
  }
};

export const reset_password = async function (req, res, next) {
  const token = req.body.token;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  const user = await User.findOne({ resetToken: req.body.token });

  if (!user) {
    // Invalid or expired token.
    return res.status(400).json({ message: "Invalid or expired token." });
  }

  if (token === user.resetToken) {
    if (newPassword != confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }
    // Reset the user's password with the new one.
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);
    // Validate the new password.

    /* check this use case later

    if (!validatePassword(hash)) {
      return res.status(400).json({
        message:
          "at least 8 characters - capital letter - small letter - symbol.",
      });
    }
    */
    user.password = hash;
    user.resetToken = null;
    user.resetTokenExpiration = null;
  }

  await User.findByIdAndUpdate(
    user.id,
    {
      $set: user,
    },
    {
      new: true,
    }
  );

  return res.status(200).json({ message: "Password reset successfully" });
};
