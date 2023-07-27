import Booking from "../models/Booking.js";

export const createBooking = async (req, res, next) => {
  const newBooking = new Booking(req.body);
  console.log(newBooking);
  try {
    const saveBooking = await newBooking.save();
    res.status(200).json(saveBooking);
  } catch (err) {
    console.log("Development bug: issue with booking");
    next(err);
  }
};
