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

export const updateTour = async (req, res, next) => {
  try {
    const updatedTour = await Tours.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedTour);
  } catch (err) {
    next(err);
  }
};

export const deleteTour = async (req, res, next) => {
  try {
    await Tours.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ responseCode: 200, message: "Tour deleted successfully" });
  } catch (err) {
    res
      .status(502)
      .json({ responseCode: 502, message: "Something went wrong!" });
    //next(err);
  }
};

export const getTours = async (req, res, next) => {
  try {
    const tours = await Tours.find();
    res.status(200).json(tours);
  } catch (err) {
    next(err);
  }
};
