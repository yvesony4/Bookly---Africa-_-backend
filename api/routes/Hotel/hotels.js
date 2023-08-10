import express from "express";

import createHotel, {
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
  viewHotelAmenities,
} from "../../controllers/Hotel/hotelController.js";
import { verifyAdmin, verifyVendor } from "../../utils/verifyToken.js";

const router = express.Router();

// API to create Hotel
router.post("/", verifyAdmin, verifyVendor, createHotel);

//API to update Hotel
router.put("/:id", verifyAdmin, updateHotel);

// API to delete Hotel
router.delete("/:id", verifyAdmin, deleteHotel);

// API to extract a single hotel details
router.get("/:id", getHotel);

// API to extract all hotels
router.get("/", getHotels);

// API to extract the amenities of a specific hotel
router.get("/hotelAmenities/:id", verifyAdmin, viewHotelAmenities);

export default router;
