import { getArticles } from "@/actions/articles/articles-actions";
import { IArticle } from "@/lib/mongodb/models/article-model";
import Link from "next/link";
import { Card } from "@/lib/next-ui/next-ui";
import React from "react";

export default async function Dashboard() {
  const articles: IArticle[] = await getArticles();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {articles.map((article) => (
        <Card
          key={article._id}
          className="p-4 hover:shadow-lg transition-shadow"
        >
          <Link href={`/articles/${article.slug}`}>
            <div>
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {article.content}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Autor:</strong> {article.author.username}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Datum vytvoření:</strong>{" "}
                {article.createdAt.toLocaleDateString()}
              </p>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
}
