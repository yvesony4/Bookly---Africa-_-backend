import Booking from "../../models/Event/Booking.js";

export const createEventBookings = async (req, res, next) => {
  req.body.date = new Date();
  req.body.status = "Pending";
  const newEventBooking = new Booking(req.body);
  try {
    const saveEventBooking = await newEventBooking.save();
    res.status(200).json(saveEventBooking);
  } catch (err) {
    next(err);
  }
};

export const modifyEventBookings = async (req, res, next) => {
  try {
    const modifyEventBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(modifyEventBooking);
  } catch (err) {
    next(err);
  }
};

export const cancelEventBookings = async (req, res, next) => {
  try {
    req.body.status = "Cancelled";
    const cancelEventBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(cancelEventBooking);
  } catch (err) {
    next(err);
  }
};

export const getEventBookings = async (req, res, next) => {
  try {
    const eventBookings = await Booking.find();
    res.status(200).json(eventBookings);
  } catch (err) {
    next(err);
  }
};
