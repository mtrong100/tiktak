import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    avatar: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String },
    city: { type: String },
    country: { type: String },
    password: { type: String, required: true },
    provider: { type: String, required: true },
    following: { type: Array },
    followers: { type: Array },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
