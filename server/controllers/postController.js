import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { errorValdationHandler } from "../utils/errorHandler.js";
import { postValidation } from "../validations/postValidtion.js";

// Create new post
export const createPost = async (req, res, next) => {
  try {
    const { error } = postValidation.validate(req.body);
    if (error) {
      const errors = errorValdationHandler(error);
      return res.status(400).json({
        message: errors,
      });
    }

    const newPost = new Post(req.body);
    await newPost.save();

    return res
      .status(201)
      .json({ message: "Create new post successfully!", results: newPost });
  } catch (error) {
    next(error);
  }
};

// Toggle like a post
export const toggleLikePost = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return next(errorHandler(404, "Post not found!"));
    }

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((item) => item !== userId);
      await post.save();
      return res
        .status(200)
        .json({ message: "Unlike post successfully!", results: post });
    } else {
      post.likes.push(userId);
      await post.save();
      return res
        .status(200)
        .json({ message: "Like post successfully!", results: post });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a post
export const deletePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return next(errorHandler(404, "Post not found!"));
    }

    return res.status(201).json({ message: "Delete post successfully!" });
  } catch (error) {
    next(error);
  }
};

// Get post detail
export const getPostDetail = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate({
      path: "user",
      select: "username avatar email",
    });

    if (!post) {
      return next(errorHandler(404, "Post not found!"));
    }

    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

// Get all posts
export const getAllPosts = async (req, res, next) => {
  const { page = 1, limit = 4 } = req.query;

  try {
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);
    const skip = (parsedPage - 1) * parsedLimit;

    const posts = await Post.find()
      .populate({
        path: "user",
        select: "username avatar email",
      })
      .limit(parsedLimit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const totalPosts = await Post.countDocuments();

    if (!posts || posts.length === 0) {
      return next(errorHandler(404, "Posts not found"));
    }

    return res.status(200).json({
      totalPosts,
      results: posts,
    });
  } catch (error) {
    next(error);
  }
};

// Get posts from user
export const getUserPosts = async (req, res, next) => {
  const id = req.params.id;
  const { page = 1, limit = 4 } = req.query;

  try {
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);
    const skip = (parsedPage - 1) * parsedLimit;

    const posts = await Post.find({ user: id })
      .populate({
        path: "user",
        select: "username avatar email",
      })
      .limit(parsedLimit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const totalPosts = await Post.countDocuments({ user: id });

    if (!posts || posts.length === 0) {
      return next(errorHandler(404, "No posts found!"));
    }

    return res.status(200).json({
      totalPosts,
      results: posts,
    });
  } catch (error) {
    next(error);
  }
};

// Get posts from user's following list
export const getUserFollowingPosts = async (req, res, next) => {
  const userId = req.params.id;
  const { page = 1, limit = 4 } = req.query;

  try {
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);
    const skip = (parsedPage - 1) * parsedLimit;

    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    const following = user.following;

    // Find posts from users in the following list
    const posts = await Post.find({ user: { $in: following } })
      .populate({
        path: "user",
        select: "username avatar email",
      })
      .limit(parsedLimit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const totalPosts = await Post.countDocuments({ user: { $in: following } });

    if (!posts || posts.length === 0) {
      return next(
        errorHandler(404, "No posts found from users you are following!")
      );
    }

    return res.status(200).json({
      totalPosts,
      results: posts,
    });
  } catch (error) {
    next(error);
  }
};
