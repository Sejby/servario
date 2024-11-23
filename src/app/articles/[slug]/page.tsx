import { getArticleBySlug } from "@/actions/articles/articles-actions";
import { IArticle } from "@/lib/mongodb/models/article-model";
import { Card, Divider } from "@/lib/next-ui/next-ui";
import React from "react";

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug: string = (await params).slug;
  const article: IArticle = await getArticleBySlug(slug);

  return (
    <div className="min-h-screen py-10 px-5">
      <Card className="max-w-4xl mx-auto">
        <div className="p-6 text-center bg-gradient-to-r bg-gray-900 text-white rounded-t-lg">
          <h1 className="mb-4 text-3xl">{article.title}</h1>
          <h3 className="opacity-90">
            <strong>Autor:</strong> {article.author.username}
          </h3>
          <h3 className="opacity-90">
            Datum publikace: {new Date(article.createdAt).toLocaleDateString()}
          </h3>
        </div>

        <Divider />
        <div className="p-6 bg-white rounded-b-lg">
          <p className="prose prose-lg text-gray-700">{article.content}</p>
        </div>
      </Card>
    </div>
  );
}
