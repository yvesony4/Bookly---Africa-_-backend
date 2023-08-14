import Tours from "../../models/Tour/Tours.js";

export const createTour = async (req, res, next) => {
  req.body.createdBy = req.user.id;
  const userType = User.findById(req.body.createdBy);

  if (userType.role != "Vendor" || req.user.isAdmin) {
    return res.status(407).json({ message: "You are not authorized" });
  }

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
    const foundTour = await Tours.findById(req.params.id);

    if (!foundTour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    foundTour.set(req.body);

    if (req.user.id === foundTour.createdBy || req.user.isAdmin) {
      const updatedTour = await foundTour.save();
      res
        .status(200)
        .json({ message: "Hotel updated successfully", hotel: updatedTour });
    } else {
      res.status(407).json({ message: "You are not authorized" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteTour = async (req, res, next) => {
  try {
    const foundTour = await Tours.findById(req.params.id);

    if (!foundTour) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    if (req.user.id === foundTour.createdBy || req.user.isAdmin) {
      await foundTour.deleteOne();
      res.status(200).json({ message: "Tour deleted successfully" });
    } else {
      res.status(407).json({ message: "You are not authorized" });
    }
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
