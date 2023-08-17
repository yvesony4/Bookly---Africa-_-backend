import mongoose from "mongoose";
import Blog from "../../models/Blog/blog.js";
import User from "../../models/User.js";
export const createBlog = async (req, res, next) => {
  // Set the createdBy field to the ID of the user who created the blog
  req.body.createdBy = req.user.id;

  // Find the user who created the blog
  const userType = await User.findById(req.body.createdBy);

  // Check if the user is authorized to create a blog
  if (userType.role !== "Vendor" && !req.user.isAdmin) {
    return res.status(407).json({ message: "You are not authorized" });
  }

  // Remove the ID from the request body
  delete req.body._id;

  // Create a new blog object with the request body
  const newBlog = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    tags: req.body.tags,
    comments: req.body.comments,
    published: true,
    createdBy: req.body.createdBy,
  });

  try {
    // Save the new blog to the database
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
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

// export const deleteComment = async (req, res, next) => {
//   try {
//     const blog = await Blog.findById(req.params.blogId);
//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }
//     const comment = blog.comments.find((comment) => comment._id.toString() === req.params.commentId);
//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }
//     if (comment.user.toString() !== req.user._id.toString()) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     blog.comments = blog.comments.filter((comment) => comment._id.toString() !== req.params.commentId);
//     await blog.save();
//     res.status(200).json({ message: "Comment deleted successfully" });
//   } catch (err) {
//     next(err);
//   }
// };
