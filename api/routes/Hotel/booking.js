import express from "express";
import {
  cancelBooking,
  createBooking,
  getBookings,
  modifyBooking,
} from "../../controllers/Hotel/bookingController.js";
import { verifyAdmin } from "../../utils/verifyToken.js";

const router = express.Router();

//booking routes
router.post("/bookNow", createBooking);
router.put("/modify/:id", verifyAdmin, modifyBooking);
router.put("/cancel/:id", verifyAdmin, cancelBooking);
// API to extract all hotels
router.get("/", getBookings);

export default router;
