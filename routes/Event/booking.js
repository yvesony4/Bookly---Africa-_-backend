import express from "express";

import {
  cancelEventBookings,
  createEventBookings,
  getEventBookings,
  modifyEventBookings,
} from "../../controllers/Event/bookingController.js";

import { verifyAdmin } from "../../utils/verifyToken.js";

const router = express.Router();

//booking routes
router.post("/bookNow", createEventBookings);
router.put("/modify/:id", verifyAdmin, modifyEventBookings);
router.put("/cancel/:id", verifyAdmin, cancelEventBookings);

// API to extract all Tour bookings
router.get("/", getEventBookings);

export default router;
