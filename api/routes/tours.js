import express from "express";
import { createTour } from "../controllers/toursController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// API to create a tour
router.post("/", verifyAdmin, createTour);

export default router;
