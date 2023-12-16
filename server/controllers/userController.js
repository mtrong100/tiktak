import User from "../models/userModel.js";
import { errorHandler, errorValdationHandler } from "../utils/errorHandler.js";
import { updateUserValidation } from "../validations/userValidation.js";

// Update user
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { username, avatar, gender, city, country } = req.body;

  try {
    const { error } = updateUserValidation.validate(req.body);
    if (error) {
      const errors = errorValdationHandler(error);
      return res.status(400).json({
        message: errors,
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username,
          avatar,
          gender,
          city,
          country,
        },
      },
      { new: true }
    );

    if (!user) {
      next(errorHandler(404, "User not found!"));
    }

    const { password, ...rest } = user._doc;

    return res
      .status(200)
      .json({ message: "Update user successfully!", results: rest });
  } catch (error) {
    next(error);
  }
};

// Follow a user
export const followUser = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const userToFollow = await User.findById(id);

    if (!userToFollow) {
      return next(errorHandler(404, "User not found!"));
    }

    // Update followers for user
    if (userToFollow.followers.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You are already following this user." });
    } else {
      userToFollow.followers.push(userId);
      await userToFollow.save();
    }

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return next(errorHandler(404, "User not found!"));
    }

    // Update following for currentUser
    if (currentUser.following.includes(id)) {
      return res
        .status(400)
        .json({ message: "You are already following this user." });
    } else {
      currentUser.following.push(id);
      await currentUser.save();
    }

    return res.json({ message: "Followed user successfully" });
  } catch (error) {
    next(error);
  }
};

// Unfollow a user
export const unFollowUser = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const userToUnFollow = await User.findById(id);

    if (!userToUnFollow) {
      return next(errorHandler(404, "User not found!"));
    }

    // Update followers for user
    if (userToUnFollow.followers.includes(userId)) {
      userToUnFollow.followers = userToUnFollow.followers.filter(
        (item) => item !== userId
      );
      await userToUnFollow.save();
    } else {
      return res.json({ message: "You are not following this user!" });
    }

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return next(errorHandler(404, "User not found!"));
    }

    // Update following for currentUser
    if (currentUser.following.includes(id)) {
      currentUser.following = currentUser.following.filter(
        (item) => item !== id
      );
      await currentUser.save();
    } else {
      return res.json({ message: "You are not following this user!" });
    }

    return res.json({ message: "Unfollowed user successfully" });
  } catch (error) {
    next(error);
  }
};

// Get user detail
export const getUserDetail = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      next(errorHandler(404, "User not found!"));
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      next(errorHandler(404, "User not found!"));
    }

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
