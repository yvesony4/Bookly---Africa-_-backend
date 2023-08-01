import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import bookingRoute from "./routes/booking.js";
import toursRoute from "./routes/tours.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDb");
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on("disconnected", function () {
  const currentDate = new Date();
  const date = currentDate.toDateString();
  console.log("Current date:", date);
  const time = currentDate.toTimeString();
  console.log("Current time:", time);
  console.log(
    "MongoDb disconnected! on " +
      date +
      " and " +
      time +
      "******************Datatabase logs"
  );
});

//MiddleWare
app.use(cookieParser());
app.use(express.json());

// Google login
app.use(
  session({
    secret: "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",
    resave: false,
    saveUninitialized: true,
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "547276093841-pj458frj0lf2ku961mc5t2a9cptjttl1.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL:
        "http://localhost:3000/bookly_africa/api/v1/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // This function will handle user information after successful login.
      // You can save the user to the database or perform any other required operations.
      return done(null, profile);
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/bookly_africa/api/v1/auth", authRoute);
app.use("/bookly_africa/api/v1/users", usersRoute);
app.use("/bookly_africa/api/v1/hotels", hotelsRoute);
app.use("/bookly_africa/api/v1/rooms", roomsRoute);
app.use("/bookly_africa/api/v1/booking", bookingRoute);
app.use("/bookly_africa/api/v1/tour", toursRoute);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  //const errorMessage = error.errorMessage || "Something went wrong!"; There is a problem with this line[needs correction]
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: error.message,
    // stack: error.stack,
  });
});

//Configuring the port to listen to
app.listen(3000, function () {
  connect();
  console.log("Server started at port 3000");
});
