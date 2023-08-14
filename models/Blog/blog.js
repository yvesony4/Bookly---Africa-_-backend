import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  comments: {
    type: [commentSchema], // Set the comments field to an array of objects
    default: [],
  },
  published: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
