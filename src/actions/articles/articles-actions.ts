"use server";

import Article from "@/lib/mongodb/models/article-model";
import { connectToDB } from "@/lib/mongodb/mongo";
import User from "@/lib/mongodb/models/user-model";
import mongoose from "mongoose";
import slugify from "slugify";
import { getServerSession, Session } from "next-auth";
import { revalidatePath } from "next/cache";

export type Article = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  createdAt: string;
};

export async function getArticles() {
  try {
    await connectToDB();

    const session: Session | null = await getServerSession();

    if (session?.user === null) {
      return "You are not logged in";
    }

    const articles = await Article.find({}).populate("author", "username");

    const serializedArticles = articles.map((article) => {
      return {
        _id: article._id.toString() as string,
        title: article.title as string,
        slug: article.slug as string,
        content: article.content as string,
        createdAt: article.createdAt.toLocaleDateString() as string,
        author: article.author.username as string,
      };
    });

    return serializedArticles;
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

    const session: Session | null = await getServerSession();

    if (session?.user === null) {
      return "You are not logged in";
    }

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

export async function getArticleById(id: string) {
  try {
    await connectToDB();
    const session: Session | null = await getServerSession();

    if (session?.user === null) {
      return "You are not logged in";
    }

    const article = await Article.findOne({ id });

    if (!article) {
      return "Article does not exist";
    }

    return article;
  } catch (error) {
    console.log(error);
    return "Failed to get article";
  }
}

export async function deleteArticleById(id: string) {
  try {
    await connectToDB();
    const session: Session | null = await getServerSession();

    if (session?.user === null) {
      return "You are not logged in";
    }

    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return "Article not found";
    }

    revalidatePath("/dashboard");

    return "Article deleted successfully";
  } catch (error) {
    console.log(error);
    return "Failed to delete article";
  }
}

export async function editArticleAction(
  previousState: any,
  formData: FormData
) {
  try {
    await connectToDB();

    const session: Session | null = await getServerSession();

    if (session?.user === null) {
      return "You are not logged in";
    }

    const articleId = formData.get("article-id") as string;
    const title = formData.get("title") as string;
    const slug = slugify(title);
    const content = formData.get("content") as string;

    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      { title, slug, content },
      { new: true }
    );

    if (!updatedArticle) {
      return "Article not found";
    }

    return "Article updated successfully";
  } catch (error) {
    console.log(error);
    return "Failed to update article";
  }
}
