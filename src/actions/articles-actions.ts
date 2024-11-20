"use server";

import Article from "@/lib/mongodb/models/article-model";
import { connectToDB } from "@/lib/mongodb/mongo";
import User, { IUser } from "@/lib/mongodb/models/user-model";
import mongoose from "mongoose";

export async function getArticles() {
  try {
    await connectToDB();

    const articles = await Article.find({});

    return articles;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createArticleAction(
  previousState: any,
  formData: FormData
) {
  try {
    await connectToDB();

    const userId = formData.get("id") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const newArticle = new Article({
      title,
      content,
      author: new mongoose.Types.ObjectId(userId),
    });

    const savedArticle = await newArticle.save();

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { articles: savedArticle._id } },
      { new: true }
    );

    if (!user) {
      return "User not found";
    }

    return "Article created successfully";
  } catch (error) {
    console.log(error);
    return "Failed to create article";
  }
}
