import express from "express";
import { createBooking } from "../controllers/bookingController.js";

const router = express.Router();

//create booking
router.post("/bookNow", createBooking);

export default router;
