import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// API to create Hotel
router.post("/", async function (req, res) {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

//API to update Hotel
router.put("/:id", async function (req, res) {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

// API to delete Hotel
router.delete("/:id", async function (req, res) {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// API to extract a single hotel details
router.get("/:id", async function (req, res) {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

// API to extract all hotels
router.get("/", async function (req, res) {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
