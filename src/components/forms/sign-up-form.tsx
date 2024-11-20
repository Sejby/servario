"use client";

import { signUpUserAction } from "@/actions/sign-up-user-action";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

export default function SignUpForm() {
  const [error, action, isPending] = useActionState(signUpUserAction, null);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Registrace</h1>

      <form action={action} className="flex flex-col gap-y-2">
        <input
          type="text"
          name="username"
          placeholder="Uživatelské jméno..."
          className="py-2 px-3 rounded-sm"
        />
        <input
          type="password"
          name="password"
          placeholder="Heslo..."
          className="py-2 px-3 rounded-sm"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white py-2 px-3 rounded-sm"
        >
          Submit
        </button>
        {isPending && <p>Please wait...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
