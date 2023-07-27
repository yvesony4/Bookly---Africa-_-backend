import mongoose from "mongoose";

const { Schema } = mongoose;

const BookingSchema = new mongoose.Schema({
  hotelName: {
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
    type: Number,
    required: true,
  },
});

export default mongoose.model("Booking", BookingSchema);
