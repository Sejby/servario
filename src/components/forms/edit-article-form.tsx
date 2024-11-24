"use client";

import {
  Article,
  editArticleAction,
} from "@/actions/articles/articles-actions";
import { useActionState } from "react";

export default function EditArticleForm({
  serializedArticle,
}: {
  serializedArticle: string;
}) {
  const article = JSON.parse(serializedArticle) as Article;
  const [error, action, isPending] = useActionState(editArticleAction, null);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Upravit příspěvek</h1>

      <form action={action} className="flex flex-col gap-y-2">
        <input type="hidden" name="article-id" value={article._id} />
        <input
          type="text"
          name="title"
          defaultValue={article.title}
          placeholder="Nadpis..."
          className="py-2 px-3 rounded-sm"
        />
        <input
          type="text"
          name="content"
          defaultValue={article.content}
          placeholder="Obsah..."
          className="py-2 px-3 rounded-sm"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white py-2 px-3 rounded-sm"
        >
          Upravit
        </button>
        {isPending && <p>Načítám...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
