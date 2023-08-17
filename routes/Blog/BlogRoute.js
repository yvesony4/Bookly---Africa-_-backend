import express from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  // deleteComment,
} from "../../controllers/Blog/blogcontroller.js";
import { validateBlogInput } from "../../utils/validation.js";
import { handleErrors } from "../../utils/error.js";
import { verifyAdmin } from "../../utils/verifyToken.js";

const router = express.Router();

// Apply middleware to routes
router.post("/create", verifyAdmin, validateBlogInput, createBlog);
router.put("/:id/update", validateBlogInput, updateBlog);
router.delete("/:id", deleteBlog);
// router.delete("/:blogId/comments/:commentId/", deleteComment);
router.get("/:id", getBlog);
router.get("/", getBlogs);

// Apply error handling middleware
router.use(handleErrors);

export default router;
