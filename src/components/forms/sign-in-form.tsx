"use client";
import { Button, Card, Input } from "@/lib/next-ui/next-ui";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await signIn("credentials", {
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        redirect: false,
      });

      if (response?.error) {
        toast.error("Neplatné údaje k přihlášení");
        setLoading(false);
        return;
      }

      if (response?.ok === false) {
        toast.error("Došlo k chybě při přihlašování");
        setLoading(false);
        return;
      }
      router.push("/dashboard");
      router.refresh();

      toast.success("Přihlášení proběhlo úspěšně");
    } catch (error) {
      console.log(error);
      toast.error("Došlo k neočekávané chybě při přihlašování");
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto max-w-[550px] p-10">
      <h1 className="text-2xl font-bold mb-6">Přihlášení</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            name="username"
            label="Uživatelské jméno"
            placeholder="pepazdepa123..."
            required
          />
        </div>

        <div>
          <Input
            type="password"
            name="password"
            label="Heslo"
            placeholder="heslo123..."
            required
          />
        </div>

        <Button
          type="submit"
          variant="bordered"
          color="success"
          disabled={loading}
          isLoading={loading}
        >
          Přihlásit se
        </Button>
      </form>
    </Card>
  );
}
