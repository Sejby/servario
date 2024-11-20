import React from "react";
import Link from "next/link";
import { getServerSession, Session } from "next-auth";
import SignOutButton from "../buttons/sign-out-button";

export default async function Navbar() {
  const session: Session | null = await getServerSession();

  return (
    <header>
      <Link href={"/"}>Home</Link>
      {session && session?.user ? (
        <>
          <Link href={"/articles/create"}>Vytvořit článek</Link>
          <SignOutButton />
        </>
      ) : (
        <>
          <Link href={"/signin"}>Přihlášení</Link>
          <Link href={"/signup"}>Registrace</Link>
        </>
      )}
    </header>
  );
}
