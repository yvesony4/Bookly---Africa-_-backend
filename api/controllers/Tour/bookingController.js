import Booking from "../../models/Tour/booking.js";

export const createTourBookings = async (req, res, next) => {
  req.body.date = new Date();
  req.body.status = "Pending";
  const newTourBooking = new Booking(req.body);
  try {
    const saveTourBooking = await newTourBooking.save();
    res.status(200).json(saveTourBooking);
  } catch (err) {
    next(err);
  }
};

export const modifyTourBookings = async (req, res, next) => {
  try {
    const modifyTourBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(modifyTourBooking);
  } catch (err) {
    next(err);
  }
};

export const cancelTourBookings = async (req, res, next) => {
  try {
    req.body.status = "Cancelled";
    const cancelTourBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(cancelTourBooking);
  } catch (err) {
    next(err);
  }
};

export const getTourBookings = async (req, res, next) => {
  try {
    const tourBookings = await Booking.find();
    res.status(200).json(tourBookings);
  } catch (err) {
    next(err);
  }
};
