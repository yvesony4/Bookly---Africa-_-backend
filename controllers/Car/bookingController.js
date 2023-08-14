import Booking from "../../models/Car/Booking.js";

export const createCarBookings = async (req, res, next) => {
  req.body.date = new Date();
  req.body.status = "Pending";
  const newCarBooking = new Booking(req.body);
  try {
    const saveEventBooking = await newCarBooking.save();
    res.status(200).json(saveEventBooking);
  } catch (err) {
    next(err);
  }
};

export const modifyCarBookings = async (req, res, next) => {
  try {
    const modifyCarBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(modifyCarBooking);
  } catch (err) {
    next(err);
  }
};

export const cancelCarBookings = async (req, res, next) => {
  try {
    req.body.status = "Cancelled";
    const cancelCarBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(cancelCarBooking);
  } catch (err) {
    next(err);
  }
};

export const getCarBookings = async (req, res, next) => {
  try {
    const carBookings = await Booking.find();
    res.status(200).json(carBookings);
  } catch (err) {
    next(err);
  }
};
