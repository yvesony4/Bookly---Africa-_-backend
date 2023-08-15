import express from "express";
import passport from "passport";
import {
  login,
  register,
  validateOTP,
  googleSuccess,
  forgot_password,
  reset_password,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/validate-otp", validateOTP);
router.post("/login", login);
router.post("/logout", logout);
router.get("/google/callback", googleSuccess);
router.post("/forgot-password", forgot_password);
router.post("/reset-password", reset_password);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Redirect the user to a success page or the home page after successful login.
    const googleLoggedIn = {
      message: "Logged in",
    };
    // // Redirect the user to a success page or the home page after successful login.
    // res.redirect("/success");
    res.status(504).json(googleLoggedIn);
  }
);

export default router;
