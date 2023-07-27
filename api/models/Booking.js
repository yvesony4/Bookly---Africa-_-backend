import mongoose from "mongoose";

const { Schema } = mongoose;

const BookingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: Date,
    required: true,
  },
  email: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
  },
  AddressLine1: {
    type: String,
  },
  AddressLine2: {
    type: String,
  },
  city: {
    type: String,
  },
  province: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  country: {
    type: String,
  },
  specialRequirement: {
    type: String,
  },
  totalPrice: {
    type: String,
  },
});

export default mongoose.model("Booking", HotelSchema);
