import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ responseCode: 200, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const assignRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const failureData = {
      message: "You are not Authorized",
      data: {
        username: user.username,
      },
    };

    if (user.role != "Admin") {
      res.status(200).json(failureData);
    }
    if (req.body.role === "Normal") {
      user.role = "Normal";
    }

    if (req.body.role === "Vendor") {
      console.log("The compiler is in Vendor mode");
      user.role = "Vendor";
    }

    if (req.body.role === "Admin") {
      user.role = "Admin";
      user.isAdmin = true;
    }

    await User.findByIdAndUpdate(
      user.id,
      {
        $set: user,
      },
      {
        new: true,
      }
    );
    const responseData = {
      message: "Role assigned successfully",
      data: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
    res.status(200).json(responseData);
  } catch (err) {
    next(err);
  }
};
