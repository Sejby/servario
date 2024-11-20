import mongoose from "mongoose";
import { IUser } from "./user-model";

export interface IArticle extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  author: mongoose.Types.ObjectId | IUser;
}

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Article ||
  mongoose.model("Article", ArticleSchema);
