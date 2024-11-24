import mongoose, { Types } from "mongoose";
import { IUser } from "./user-model";

export interface IArticle {
  _id: Types.ObjectId | string;
  title: string;
  slug: string;
  content: string;
  author: Types.ObjectId | IUser;
  createdAt: Date | string;
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
    slug: {
      type: String,
      required: true,
      unique: true,
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Article ||
  mongoose.model("Article", ArticleSchema);
