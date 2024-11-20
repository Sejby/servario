import { getArticles } from "@/actions/articles-actions";
import { IArticle } from "@/lib/mongodb/models/article-model";
import { GetServerSideProps } from "next";
import React from "react";

export default async function Dashboard() {
  const articles: IArticle[] = await getArticles();

  return (
    <div>
      {articles.map((article) => (
        <div key={article._id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
}
