import Tours from "../models/Tours.js";

export const createTour = async (req, res, next) => {
  const newTour = new Tours(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(200).json(savedTour);
  } catch (err) {
    next(err);
  }
};
