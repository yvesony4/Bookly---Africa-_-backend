import express from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getBlogs,
} from "../../controllers/Blog/blogcontroller.js";

const router = express.Router();

// Create a new blog
router.post("/create", createBlog);

// Update an existing blog
router.put("/:id/update", updateBlog);

// Delete an existing blog
router.delete("/:id/delete", deleteBlog);

// Get a blog by ID
router.get("/:id", getBlog);

// Get all blogs
router.get("/", getBlogs);

export default router;
