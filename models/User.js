import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    validated: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiration: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
