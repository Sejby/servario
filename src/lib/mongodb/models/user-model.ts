import mongoose from "mongoose";
import { IArticle } from "./article-model";


export interface IUser extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
  articles: mongoose.Types.ObjectId[] | IArticle[];
  createdAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
