import mongoose from "mongoose";

const { Schema } = mongoose;

const ToursSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  youtubeVideo: {
    type: String,
    required: true,
  },
  minAdvanceReservation: {
    type: String,
  },
  duration: {
    type: Number,
  },
  tourMinPeople: {
    type: Number,
  },
  tourMaxPeople: {
    type: Number,
  },
  include: [{ title: String }],
  exclude: [{ title: String }],
  itenary: [
    { title: String, description: String, image: [String], content: String },
  ],

  tourLocation: {
    type: String,
  },
  realTourAddress: {
    type: String,
  },

  price: [{ tourPrice: Number, salePrice: Number }],
});

export default mongoose.model("Tours", ToursSchema);
