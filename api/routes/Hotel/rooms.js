import express from "express";
import { verifyAdmin } from "../../utils/verifyToken.js";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  viewRoomAmenities,
} from "../../controllers/Hotel/roomController.js";

const router = express.Router();

// API to create Room
router.post("/:hotelid", verifyAdmin, createRoom);

//API to update Room
router.put("/:id", verifyAdmin, updateRoom);

// API to delete Room
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// API to extract a single Room details
router.get("/:id", getRoom);

// API to extract all rooms
router.get("/", getRooms);

// API to extract the amenities of a specific room
router.get("/:id/:hotelid", verifyAdmin, viewRoomAmenities);

export default router;
