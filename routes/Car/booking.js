import express from "express";
import {
  cancelCarBookings,
  createCarBookings,
  getCarBookings,
  modifyCarBookings,
} from "../../controllers/Car/bookingController.js";
import { verifyAdmin } from "../../utils/verifyToken.js";

const router = express.Router();

//booking routes
router.post("/bookNow", createCarBookings);
router.put("/modify/:id", verifyAdmin, modifyCarBookings);
router.put("/cancel/:id", verifyAdmin, cancelCarBookings);

// API to extract all car bookings
router.get("/", getCarBookings);

export default router;
