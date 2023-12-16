import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  authValidation,
  emailValidation,
} from "../validations/authValiation.js";
import { errorValdationHandler } from "../utils/errorHandler.js";

// OAuth login
export const OAuthLogin = async (req, res, next) => {
  const { email, username, avatar, provider } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const { error } = authValidation.validate(req.body);
      if (error) {
        const errors = errorValdationHandler(error);
        return res.status(400).json({
          message: errors,
        });
      }

      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(generatedPassword, salt);

      const newUser = new User({
        username,
        avatar,
        email,
        provider,
        password: hash,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;

      res.status(201).json({
        message: "Create account successfully!",
        results: rest,
        token,
      });
    } else {
      const { error } = emailValidation.validate(req.body);
      if (error) {
        const errors = errorValdationHandler(error);
        return res.status(400).json({
          message: errors,
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;

      res.status(200).json({
        message: "Login sucessfully!",
        results: rest,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};
