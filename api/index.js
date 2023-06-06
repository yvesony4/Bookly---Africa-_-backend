import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

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
    "MongoDb disconnected! on" +
      date +
      "and " +
      time +
      "******************Datatabase logs"
  );
});

//MiddleWare
app.use(express.json());

app.use("/bookly_africa/api/v1/auth", authRoute);
app.use("/bookly_africa/api/v1/users", usersRoute);
app.use("/bookly_africa/api/v1/hotels", hotelsRoute);
app.use("/bookly_africa/api/v1/rooms", roomsRoute);

app.use(function (err, req, res, next) {
  const errorStatus = err.status || 500;
  const errorMessage = err.errorMessage || "Oops!, Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//Configuring the port to listen to
app.listen(3000, function () {
  connect();
  console.log("Server started at port 3000");
});
