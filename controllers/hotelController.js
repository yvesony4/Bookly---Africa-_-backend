import Hotel from "../models/Hotel.js";

const createHotel = async (req, res, next) => {
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
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
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
