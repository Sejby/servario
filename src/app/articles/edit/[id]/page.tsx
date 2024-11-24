import { Article, getArticleById } from "@/actions/articles/articles-actions";
import EditArticleForm from "@/components/forms/edit-article-form";
import React from "react";

export default async function EditArticle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  console.log(params);
  const article: Article = await getArticleById((await params).id);
  return (
    <div>
      <EditArticleForm serializedArticle={JSON.stringify(article)} />
    </div>
  );
}
