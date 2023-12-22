import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const postSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    video: { type: String, required: true },
    likes: { type: Array },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model("Post", postSchema);
export default Post;
