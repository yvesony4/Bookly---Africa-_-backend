import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// These code are for Testing purposes only
/*router.get("/checkAuth", verifyToken, (req, res, next) => {
  res.send("You are logged in");
});

router.get("/checkUser/:id", verifyUser, (req, res, next) => {
  res.send("User, You are logged in and can delete your account");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("Admin, You are logged in and can delete any account");
});
*/

//API to update user
router.put("/:id", verifyUser, updateUser);

// API to delete user
router.delete("/:id", verifyUser, deleteUser);

// API to extract a single user details
router.get("/:id", verifyUser, getUser);

// API to extract all users
router.get("/", verifyAdmin, getUsers);

export default router;
