"use server";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export async function signOutUserAction(): Promise<void> {
  signOut();

  redirect("/signin");
}
