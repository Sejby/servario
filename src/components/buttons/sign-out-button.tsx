"use client";

import { signOut } from "next-auth/react";
import React from "react";

export default function SignOutButton() {
  return (
    <button
      onClick={async () => {
        await signOut({ callbackUrl: "/signin" });
      }}
    >
      SignOutButton
    </button>
  );
}
