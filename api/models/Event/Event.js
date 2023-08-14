import mongoose from "mongoose";

const { Schema } = mongoose;

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  youtubeVideo: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
  },
  duration: {
    type: Number,
  },
  FAQs: [{ title: String, content: String }],
  bannerImage: {
    type: [String],
  },
  gallery: {
    type: [String],
  },
  featuredImage: {
    type: [String],
  },

  // Location
  location: {
    type: String,
  },
  mapLatitude: {
    type: Number,
  },
  mapLongitude: {
    type: Number,
  },

  //Pricing
  availability: {
    type: String,
  },
  price: {
    type: Number,
  },
  salePrice: {
    type: Number,
  },
  extraPrice: [{ name: String, price: Number, type: String }],

  buyerFee: [{ name: String, price: Number, type: String }],
  createdBy: {
    type: String,
  },
});

export default mongoose.model("Events", EventSchema);
