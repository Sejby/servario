"use client";

import { createArticleAction } from "@/actions/articles-actions";
import { signUpUserAction } from "@/actions/sign-up-user-action";
import { useSession } from "next-auth/react";
import { useActionState } from "react";

export default function CreateArticleForm() {
  const [error, action, isPending] = useActionState(createArticleAction, null);
  const { data: session } = useSession();

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Vytvoření příspěvku</h1>

      <form action={action} className="flex flex-col gap-y-2">
        <input type="hidden" name="id" value={session?.user.id} />
        <input
          type="text"
          name="title"
          placeholder="Nadpis..."
          className="py-2 px-3 rounded-sm"
        />
        <input
          type="password"
          name="content"
          placeholder="Obsah..."
          className="py-2 px-3 rounded-sm"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white py-2 px-3 rounded-sm"
        >
          Vytvořit
        </button>
        {isPending && <p>Načítám...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
