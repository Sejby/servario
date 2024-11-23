"use client";

import { NavbarContent, NavbarItem } from "@nextui-org/react";
import { Session } from "next-auth";
import React from "react";
import SignOutButton from "./sign-out-button";
import Link from "next/link";

export default function SignButtons({ session }: { session: Session | null }) {
  return (
    <NavbarContent justify="end">
      {session && session?.user ? (
        <>
          <NavbarItem>
            <Link href={"/articles/create"}>Vytvořit článek</Link>
            <SignOutButton />
          </NavbarItem>
        </>
      ) : (
        <>
          <NavbarItem>
            <Link href={"/signin"}>Přihlášení</Link>
            <Link href={"/signup"}>Registrace</Link>
          </NavbarItem>
        </>
      )}
    </NavbarContent>
  );
}
