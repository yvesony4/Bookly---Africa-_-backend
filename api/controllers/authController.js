import User from "../models/User.js";
import bcrypt from "bcrypt";
import createError from "../utils/error.js";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Create a transporter using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true, // Set to true if your SMTP server uses TLS
  auth: {
    user: "yvlison4@gmail.com", // Your email address
    pass: "xymbwislsjjnxewl", // Your email password or an app-specific password
  },
});

export const register = async function (req, res, next) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res
      .status(200)
      .json({ responseCode: 200, message: "User created successfully" });

    if (res.status(200)) {
      // Email content
      const mailOptions = {
        from: "yvlison4@gmail.com", // Sender address
        to: req.body.email, // List of recipients
        subject: "Registration confirmation", // Subject line
        text: "Hello from Bookly Africa, <b> This is to confirm your email after successful registration on our platform!", // Plain text body
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
    res.status(200).send("User created successfully");
  } catch (err) {
    next(err);
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
