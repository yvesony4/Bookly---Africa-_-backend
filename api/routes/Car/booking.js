import express from "express";
import {
  cancelCarBookings,
  createCarBookings,
  modifyCarBookings,
} from "../../controllers/Car/bookingController.js";
import { verifyAdmin } from "../../utils/verifyToken.js";
import { getEventBookings } from "../../controllers/Event/bookingController.js";

const router = express.Router();

//booking routes
router.post("/bookNow", createCarBookings);
router.put("/modify/:id", verifyAdmin, modifyCarBookings);
router.put("/cancel/:id", verifyAdmin, cancelCarBookings);

// API to extract all Event bookings
router.get("/", getEventBookings);

export default router;
