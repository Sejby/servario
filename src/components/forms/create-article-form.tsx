"use client";

import { createArticleAction } from "@/actions/articles/articles-actions";
import { Button, Card, Input } from "@/lib/next-ui/next-ui";
import { useSession } from "next-auth/react";
import { useActionState } from "react";

export default function CreateArticleForm() {
  const [error, action, isPending] = useActionState(createArticleAction, null);
  const { data: session } = useSession();

  return (
    <Card className="mx-auto max-w-[550px] p-10">
      <h1 className="text-2xl font-bold mb-6">Vytvoření příspěvku</h1>

      <form action={action} className="space-y-4">
        <input type="hidden" name="id" defaultValue={session?.user.id} />
        <Input type="text" name="title" label="Nadpis (max. 200 znaků)" placeholder="Příběh Pepy..." />
        <Input type="text" name="content" label="Obsah" placeholder="Pepa z depa došel do depa..." />
        <Button
          type="submit"
          variant="bordered"
          color="success"
          disabled={isPending}
          isLoading={isPending}
        >
          Vytvořit
        </Button>
        {isPending && <p>Načítám...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Card>
  );
}
