import mongoose from "mongoose";

const { Schema } = mongoose;

const BookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  roomType: {
    type: String,
  },
  SpecialRequest: {
    type: String,
  },
});

export default mongoose.model("Booking", HotelSchema);
