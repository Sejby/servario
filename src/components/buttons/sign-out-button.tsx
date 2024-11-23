"use client";

import { Button } from "@/lib/next-ui/next-ui";
import { signOut } from "next-auth/react";
import React from "react";

export default function SignOutButton() {
  return (
    <Button
      color="warning"
      variant="flat"
      onClick={async () => {
        await signOut({ callbackUrl: "/signin" });
      }}
    >
      Odhlásit se
    </Button>
  );
}
