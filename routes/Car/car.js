import express from "express";

import {
  createCar,
  deleteCar,
  getCars,
  updateCar,
} from "../../controllers/Car/carController.js";

import { verifyAdmin } from "../../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createCar);
router.delete("/:id", verifyAdmin, deleteCar);
router.get("/", getCars);
router.put("/:id", verifyAdmin, updateCar);

export default router;
