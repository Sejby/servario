"use client";

import { signUpUserAction } from "@/actions/users/sign-up-user-action";
import { useActionState } from "react";
import { Button, Card, Input } from "@/lib/next-ui/next-ui";
import toast from "react-hot-toast";

export default function SignUpForm() {
  const [error, action, isPending] = useActionState(signUpUserAction, null);

  if (error) {
    toast.error(error);
  }

  return (
    <Card className="mx-auto max-w-[550px] p-10">
      <h1 className="text-2xl font-bold mb-6">Registrace</h1>

      <form action={action} className="space-y-4">
        <Input
          type="text"
          name="username"
          label="Uživatelské jméno"
          placeholder="pepazdepa123..."
        />
        <Input
          type="password"
          name="password"
          label="Heslo"
          placeholder="heslo123..."
        />
        <Button
          type="submit"
          disabled={isPending}
          isLoading={isPending}
          color="danger"
          variant="flat"
        >
          Registrovat
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Card>
  );
}
