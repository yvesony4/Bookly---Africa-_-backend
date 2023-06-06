import express from "express";

import createHotel, {
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

// API to create Hotel
router.post("/", createHotel);

//API to update Hotel
router.put("/:id", updateHotel);

// API to delete Hotel
router.delete("/:id", deleteHotel);

// API to extract a single hotel details
router.get("/:id", getHotel);

// API to extract all hotels
router.get("/", getHotels);

export default router;
