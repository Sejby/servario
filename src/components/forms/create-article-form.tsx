"use client";

import { createArticleAction } from "@/actions/articles/articles-actions";
import { Button, Card, Input } from "@/lib/next-ui/next-ui";
import { useSession } from "next-auth/react";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CreateArticleForm() {
  const [state, action, isPending] = useActionState(createArticleAction, null);
  const { data: session } = useSession();

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Příspěvek byl úspěšně vytvořen!");
    } else if (state?.success === false) {
      toast.error(state.message || "Nepodařilo se vytvořit příspěvek.");
    }
  }, [state]);

  return (
    <Card className="mx-auto max-w-[550px] p-10">
      <h1 className="text-2xl font-bold mb-6">Vytvoření příspěvku</h1>

      <form action={action} className="space-y-4">
        <input type="hidden" name="id" defaultValue={session?.user.id} />
        <Input
          type="text"
          name="title"
          label="Nadpis (max. 200 znaků)"
          placeholder="Příběh Pepy..."
        />
        <Input
          type="text"
          name="content"
          label="Obsah"
          placeholder="Pepa z depa došel do depa..."
        />
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
        {state?.success === false && (
          <p className="text-red-500">{state.message}</p>
        )}
      </form>
    </Card>
  );
}
