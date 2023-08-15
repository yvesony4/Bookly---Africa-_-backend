import express from "express";
import {
  cancelTourBookings,
  createTourBookings,
  getTourBookings,
  modifyTourBookings,
} from "../../controllers/Tour/bookingController.js";
import { verifyAdmin } from "../../utils/verifyToken.js";

const router = express.Router();
//booking routes
router.post("/bookNow", createTourBookings);
router.put("/modify/:id", verifyAdmin, modifyTourBookings);
router.put("/cancel/:id", verifyAdmin, cancelTourBookings);

// API to extract all Tour bookings
router.get("/", getTourBookings);

export default router;
