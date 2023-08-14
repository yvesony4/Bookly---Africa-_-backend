import Car from "../../models/Car/Car.js";

export const createCar = async (req, res, next) => {
  req.body.createdBy = req.user.id;
  const userType = User.findById(req.body.createdBy);

  if (userType.role != "Vendor" || req.user.isAdmin) {
    return res.status(407).json({ message: "You are not authorized" });
  }
  const newCar = new Car(req.body);
  try {
    const savedCar = await newCar.save();
    res.status(200).json(savedCar);
  } catch (err) {
    next(err);
  }
};

export const updateCar = async (req, res, next) => {
  try {
    const foundCar = await Car.findById(req.params.id);

    if (!foundCar) {
      return res.status(404).json({ error: "Tour not found" });
    }

    foundCar.set(req.body);

    if (req.user.id === foundCar.createdBy || req.user.isAdmin) {
      const updatedCar = await foundCar.save();
      res
        .status(200)
        .json({ message: "Hotel updated successfully", hotel: updatedCar });
    } else {
      res.status(407).json({ message: "You are not authorized" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteCar = async (req, res, next) => {
  try {
    const foundCar = await Car.findById(req.params.id);

    if (!foundCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    if (req.user.id === foundCar.createdBy || req.user.isAdmin) {
      await foundCar.deleteOne();
      res.status(200).json({ message: "Car deleted successfully" });
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

export const getCars = async (req, res, next) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
};
