import Room from "../models/Room.js";

import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    console.log("Saved Room: " + savedRoom._id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  console.log("hotelid" + req.params.hotelid);
  console.log("hotelId" + req.params.hotelId);
  const hotelid = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelid, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res
      .status(200)
      .json({ responseCode: 200, message: "Room deleted successfully" });
  } catch (err) {
    res
      .status(502)
      .json({ responseCode: 502, message: "Something went wrong!" });
    //next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const viewRoomAmenities = async (req, res, next) => {
  try {
    try {
      const foundroom = await Room.findById(req.params.id);
      console.log("Test");
      console.log("The room found:" + foundroom);
      const roomAmenities = foundroom.amenities;
      res.status(200).json({ responseCode: 200, roomAmenities });
    } catch (err) {
      next(err);
    }
  } catch (err) {
    res
      .status(502)
      .json({ responseCode: 502, message: "error retrieving room amenities" });
  }
};
