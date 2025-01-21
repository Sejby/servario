"use client";

import {
  Article,
  editArticleAction,
} from "@/actions/articles/articles-actions";
import { Button, Card, Input } from "@/lib/next-ui/next-ui";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function EditArticleForm({
  serializedArticle,
}: {
  serializedArticle: string;
}) {
  const article = JSON.parse(serializedArticle) as Article;
  const [state, action, isPending] = useActionState(editArticleAction, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Článek byl úspěšně upraven!");
    } else if (state?.success === false) {
      toast.error(state.message || "Nepodařilo se upravit článek.");
    }
  }, [state]);

  return (
    <Card className="mx-auto max-w-[550px] p-10">
      <h1 className="text-2xl font-bold mb-6">Upravit příspěvek</h1>

      <form action={action} className="space-y-4">
        <input type="hidden" name="article-id" value={article._id} />
        <Input
          type="text"
          name="title"
          label="Nadpis (max. 200 znaků)"
          defaultValue={article.title}
          placeholder="Nadpis..."
        />
        <Input
          type="text"
          name="content"
          label="Obsah"
          defaultValue={article.content}
          placeholder="Obsah..."
        />
        <Button
          type="submit"
          variant="bordered"
          color="primary"
          disabled={isPending}
          isLoading={isPending}
        >
          Upravit
        </Button>
        {isPending && <p>Načítám...</p>}
        {state?.success === false && (
          <p className="text-red-500">{state.message}</p>
        )}
      </form>
    </Card>
  );
}
