import express from "express";

import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../../controllers/Event/eventController.js";
import { verifyAdmin } from "../../utils/verifyToken.js";

const router = express.Router();

// API to create a tour
router.post("/", verifyAdmin, createEvent);
router.delete("/:id", verifyAdmin, deleteEvent);
router.get("/", getEvents);
router.put("/:id", verifyAdmin, updateEvent);

export default router;
