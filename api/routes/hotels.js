import express from "express";

import createHotel, {
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// API to create Hotel
router.post("/", verifyAdmin, createHotel);

//API to update Hotel
router.put("/:id", verifyAdmin, updateHotel);

// API to delete Hotel
router.delete("/:id", verifyAdmin, deleteHotel);

// API to extract a single hotel details
router.get("/:id", getHotel);

// API to extract all hotels
router.get("/", getHotels);

export default router;
