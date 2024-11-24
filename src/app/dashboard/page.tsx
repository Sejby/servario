"use server";

import { Article, getArticles } from "@/actions/articles/articles-actions";
import ArticleDatagrid from "@/components/common/article-datagrid";
import React from "react";

export default async function Dashboard() {
  const articles: Article[] = await getArticles();

  return (
    <>
      <div className="mx-auto max-w-[1000px] mt-10">
        <ArticleDatagrid articles={articles} />
      </div>
    </>
  );
}
