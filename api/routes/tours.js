import express from "express";
import {
  createTour,
  deleteTour,
  getTours,
  updateTour,
} from "../controllers/toursController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// API to create a tour
router.post("/", verifyAdmin, createTour);

// API to delete tour
router.delete("/:id", verifyAdmin, deleteTour);

// API to extract all tours
router.get("/", getTours);

router.put("/:id", verifyAdmin, updateTour);

export default router;
