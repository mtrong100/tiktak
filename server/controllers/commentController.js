import Comment from "../models/CommentModel.js";
import { errorHandler, errorValdationHandler } from "../utils/errorHandler.js";
import {
  commentValidation,
  updateCommmentValidation,
} from "../validations/commentValidation.js";

// Create new comment
export const createComment = async (req, res, next) => {
  try {
    const { error } = commentValidation.validate(req.body);
    if (error) {
      const errors = errorValdationHandler(error);
      return res.status(400).json({
        message: errors,
      });
    }

    const newComment = await Comment(req.body);
    newComment.save();

    return res.status(201).json({
      message: "Create new comment successfully!",
      results: newComment,
    });
  } catch (error) {
    next(error);
  }
};

// Update comment
export const updateComment = async (req, res, next) => {
  const { id } = req.params;
  const { content, image } = req.body;

  try {
    const { error } = updateCommmentValidation.validate(req.body);
    if (error) {
      const errors = errorValdationHandler(error);
      return res.status(400).json({
        message: errors,
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateComment) {
      return next(errorHandler(404, "Comment not found!"));
    }

    return res.status(200).json({
      message: "Update comment successfully!",
      results: updatedComment,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a comment
export const deleteComment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return next(errorHandler(404, "Comment not found!"));
    }

    return res.status(200).json({
      message: "Delete comment successfully!",
    });
  } catch (error) {
    next(error);
  }
};

// Get all comments
export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().populate({
      path: "user",
      select: "username avatar email",
    });

    if (!comments || comments.length === 0) {
      return next(errorHandler(404, "No comments found!"));
    }

    return res.status(201).json(comments);
  } catch (error) {
    next(error);
  }
};
