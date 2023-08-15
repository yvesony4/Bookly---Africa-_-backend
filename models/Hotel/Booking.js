import mongoose from "mongoose";

const { Schema } = mongoose;

const BookingSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  specialRequirement: {
    type: String,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
  },
  paid: {
    type: String,
    default: false,
  },
});

export default mongoose.model("HotelBooking", BookingSchema);
