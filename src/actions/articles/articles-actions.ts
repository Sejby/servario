"use server";

import Article from "@/lib/mongodb/models/article-model";
import { connectToDB } from "@/lib/mongodb/mongo";
import User from "@/lib/mongodb/models/user-model";
import mongoose from "mongoose";
import slugify from "slugify";
import { getServerSession, Session } from "next-auth";

export async function getArticles() {
  try {
    await connectToDB();

    const articles = await Article.find({}).populate("author", "username");

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
    const slug: string = slugify(title);
    const content = formData.get("content") as string;

    const newArticle = new Article({
      title,
      slug,
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

export async function getArticleBySlug(slug: string) {
  try {
    await connectToDB();
    const session: Session | null = await getServerSession();

    if (session?.user === null) {
      return "You are not logged in";
    }

    const article = await Article.findOne({ slug }).populate("author");

    if (!article) {
      return "Article does not exist";
    }

    return article;
  } catch (error) {
    console.log(error);
    return "Failed to get article";
  }
}
