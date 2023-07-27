import Booking from "../models/Booking.js";

//create Booking
export const createBooking = async (req, res, next) => {
  req.body.date = new Date();
  req.body.status = "Pending";
  const newBooking = new Booking(req.body);
  try {
    const saveBooking = await newBooking.save();
    res.status(200).json(saveBooking);
  } catch (err) {
    console.log("Development bug: issue with booking");
    next(err);
  }
};

export const modifyBooking = async (req, res, next) => {
  try {
    const modifyBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(modifyBooking);
  } catch (err) {
    next(err);
  }
};
