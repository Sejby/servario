import { IArticle } from "@/lib/mongodb/models/article-model";
import { Card } from "@/lib/next-ui/next-ui";
import Link from "next/link";
import React from "react";

export default function Article({ article }: { article: IArticle }) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <Link href={`/articles/${article.slug}`}>
        <div>
          <h2 className="text-xl font-bold mb-2">{article.title}</h2>
          <p className="text-gray-700 mb-4 line-clamp-3">{article.content}</p>
          <p className="text-sm text-gray-500 mb-2">
            <strong>Autor:</strong>{" "}
            {"username" in article.author ? article.author.username : "Neznámý"}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Datum vytvoření:</strong>{" "}
            {article.createdAt.toLocaleDateString()}
          </p>
        </div>
      </Link>
    </Card>
  );
}
