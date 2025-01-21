"use server";

import Article from "@/lib/mongodb/models/article-model";
import { connectToDB } from "@/lib/mongodb/mongo";
import User from "@/lib/mongodb/models/user-model";
import mongoose from "mongoose";
import slugify from "slugify";
import { getServerSession, Session } from "next-auth";
import { revalidatePath } from "next/cache";
import redis from "@/lib/redis/redis";

export type Article = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  createdAt: string;
};

type PreviousState = {
  articles: Article[];
  user?: { id: string; name: string };
};

export async function getArticles() {
  const cacheKey = "articles";

  try {
    const cachedArticles = await redis.get(cacheKey);

    if (cachedArticles) {
      console.log("Loading articles from cache");
      return JSON.parse(cachedArticles);
    }

    await connectToDB();
    const articles = await Article.find({})
      .populate("author", "username")
      .sort({ createdAt: -1 });

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

    await redis.set(cacheKey, JSON.stringify(serializedArticles), "EX", 10);

    console.log("Loading articles from database and caching them");
    return serializedArticles;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
}

export async function createArticleAction(
  previousState: PreviousState,
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
      return { success: false, message: "User not found" };
    }

    revalidatePath("/dashboard");
    return { success: true, message: "Článek úspěšně vytvořen!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Při vytvoření článku nastala chyba." };
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
  previousState: PreviousState,
  formData: FormData
) {
  try {
    await connectToDB();

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
      return { success: false, message: "Příspěvek nebyl nalezen." };
    }

    revalidatePath("/dashboard");
    return { success: true, message: "Příspěvek byl úspěšně upraven!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Nepodařilo se upravit příspěvek." };
  }
}
