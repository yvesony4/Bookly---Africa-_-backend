import mongoose from "mongoose";
import Blog from "../../models/Blog/blog.js";

// Input validation middleware
const validateBlogInput = (req, res, next) => {
  const { title, content, author, tags, comments } = req.body;
  if (!title || !content || !author || !tags || !comments) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!Array.isArray(tags) || !Array.isArray(comments)) {
    return res.status(400).json({ message: "Tags and comments must be arrays" });
  }
  next();
};

// Error handling middleware
const handleErrors = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
};

// Authentication middleware
const authenticate = (req, res, next) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// Data sanitization middleware
const sanitizeData = (req, res, next) => {
  // Sanitize input data
  req.body.title = sanitize(req.body.title);
  req.body.content = sanitize(req.body.content);
  req.body.author = sanitize(req.body.author);
  req.body.tags = req.body.tags.map((tag) => sanitize(tag));
  req.body.comments = req.body.comments.map((comment) => ({
    author: sanitize(comment.author),
    content: sanitize(comment.content),
  }));
  next();
};

export const createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      tags: req.body.tags,
      comments: req.body.comments,
      published: true,
    });
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          author: req.body.author,
          tags: req.body.tags,
          comments: req.body.comments,
        },
      },
      {
        new: true,
      }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }
    const deletedBlog = await Blog.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res
      .status(200)
      .json({ responseCode: 200, message: "Blog deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }
    const blog = await Blog.findOne({
      _id: req.params.id,
      published: true,
    });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ published: true });
    if (blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const comment = blog.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    comment.remove();
    await blog.save();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
};
