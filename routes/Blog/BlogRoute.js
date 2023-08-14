import express from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  deleteComment,
} from "../../controllers/Blog/blogcontroller.js";
import { validateBlogInput } from "../../utils/validation.js";
import { authenticate, handleErrors } from "../../utils/error.js";

const router = express.Router();

// Apply middleware to routes
router.post("/create", authenticate, validateBlogInput, createBlog);
router.put("/:id/update", authenticate, validateBlogInput, updateBlog);
router.delete("/:id/delete", authenticate, deleteBlog);
router.delete("/:blogId/comments/:commentId/delete", authenticate, deleteComment);
router.get("/:id", getBlog);
router.get("/", getBlogs);

// Apply error handling middleware
router.use(handleErrors);

export default router;
