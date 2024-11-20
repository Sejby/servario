"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await signIn("credentials", {
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        redirect: false,
      });

      console.log("Sign in response:", response); // Přidejte tento log

      if (response?.error) {
        setError(`Přihlašovací chyba: ${response.error}`);
        return;
      }

      if (response?.ok === false) {
        setError("Došlo k chybě při přihlašování");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Přihlašovací chyba:", error);
      setError("Došlo k chybě při přihlašování");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Přihlášení</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">
            Username
            <input
              name="username"
              type="text"
              required
              className="w-full p-2 border rounded"
            />
          </label>
        </div>

        <div>
          <label className="block mb-1">
            Heslo
            <input
              name="password"
              type="password"
              required
              className="w-full p-2 border rounded"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Přihlásit se
        </button>
      </form>
    </div>
  );
}
