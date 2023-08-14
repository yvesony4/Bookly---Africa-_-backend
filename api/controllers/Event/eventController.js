import Event from "../../models/Event/Event.js";

export const createEvent = async (req, res, next) => {
  req.body.createdBy = req.user.id;
  const userType = User.findById(req.body.createdBy);

  if (userType.role != "Vendor" || req.user.isAdmin) {
    return res.status(407).json({ message: "You are not authorized" });
  }

  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const foundEvent = await Event.findById(req.params.id);

    if (!foundEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    foundEvent.set(req.body);

    if (req.user.id === foundEvent.createdBy || req.user.isAdmin) {
      const updatedEvent = await foundEvent.save();
      res
        .status(200)
        .json({ message: "Hotel updated successfully", hotel: updatedEvent });
    } else {
      res.status(407).json({ message: "You are not authorized" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const foundEvent = await Event.findById(req.params.id);

    if (!foundEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (req.user.id === foundEvent.createdBy || req.user.isAdmin) {
      await foundEvent.deleteOne();
      res.status(200).json({ message: "Event deleted successfully" });
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

export const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};
