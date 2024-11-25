import mongoose from "mongoose";
import Collections from "../database/collection.js";
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    
  },{ timestamps: true }

);

const PostModel = mongoose.model(Collections.POSTS, postSchema);

export default PostModel;
