import mongoose from "mongoose";
import Blog from "../../models/Blog/blog.js"


export const createBlog = async (req, res, next) => {
  try {
    // Validate the title field
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

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
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};
