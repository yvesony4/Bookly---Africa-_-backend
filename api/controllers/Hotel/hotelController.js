import Hotel from "../../models/Hotel/Hotel.js";
import User from "../../models/User.js";

const createHotel = async (req, res, next) => {
  req.body.createdBy = req.user.id;
  const userType = User.findById(req.body.createdBy);

  if (userType.role != "Vendor" || req.user.isAdmin) {
    return res.status(407).json({ message: "You are not authorized" });
  }

  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const foundHotel = await Hotel.findById(req.params.id);

    if (!foundHotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    foundHotel.set(req.body);

    if (req.user.id === foundHotel.createdBy || req.user.isAdmin) {
      const updatedHotel = await foundHotel.save();
      res
        .status(200)
        .json({ message: "Hotel updated successfully", hotel: updatedHotel });
    } else {
      res.status(407).json({ message: "You are not authorized" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    const foundHotel = await Hotel.findById(req.params.id);

    if (!foundHotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    if (req.user.id === foundHotel.createdBy || req.user.isAdmin) {
      await foundHotel.deleteOne();
      res.status(200).json({ message: "Hotel deleted successfully" });
    } else {
      res.status(407).json({ message: "You are not authorized" });
    }

    await foundHotel.deleteOne();

    await Hotel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ responseCode: 200, message: "Hotel deleted successfully" });
  } catch (err) {
    res
      .status(502)
      .json({ responseCode: 502, message: "Something went wrong!" });
    //next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const viewHotelAmenities = async (req, res, next) => {
  try {
    try {
      const foundhotel = await Hotel.findById(req.params.id);
      console.log("Test");
      console.log("The Hotel found:" + foundhotel);
      const hotelAmenities = foundhotel.amenities;
      res.status(200).json({ responseCode: 200, hotelAmenities });
    } catch (err) {
      next(err);
    }
  } catch (err) {
    res
      .status(502)
      .json({ responseCode: 502, message: "error retrieving room amenities" });
  }
};

export default createHotel;
