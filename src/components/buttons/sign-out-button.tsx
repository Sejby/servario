"use client";

import { Button } from "@/lib/next-ui/next-ui";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut({ callbackUrl: "/signin" });
    } catch (error) {
      toast.error("Odhlášení selhalo, zkuste to prosím znovu.");
      setIsLoading(false);
    }
  };

  return (
    <Button
      color="warning"
      variant="flat"
      onClick={handleSignOut}
      disabled={isLoading}
      isLoading={isLoading}
    >
      Odhlásit se
    </Button>
  );
}
