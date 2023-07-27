import express from "express";
import {
  createBooking,
  modifyBooking,
} from "../controllers/bookingController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//booking routes
router.post("/bookNow", createBooking);
router.put("/modify/:id", verifyAdmin, modifyBooking);

export default router;
