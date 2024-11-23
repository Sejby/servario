import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@/lib/next-ui/next-ui";
import React from "react";
import { getServerSession, Session } from "next-auth";
import SignOutButton from "../buttons/sign-out-button";

export default async function Header() {
  const session: Session | null = await getServerSession();

  return (
    <header>
      <Navbar>
        <NavbarBrand>
          <Link href="/" color="foreground">
            Home
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          {session && session?.user ? (
            <>
              <NavbarItem>
                <Link href={"/dashboard"} color="foreground">
                  Dashboard
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  className="mr-5"
                  color="foreground"
                  href={"/articles/create"}
                >
                  Vytvořit článek
                </Link>
                <SignOutButton />
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem className="space-x-5">
                <Link href={"/signin"} color="foreground">
                  Přihlášení
                </Link>
                <Link href={"/signup"} color="foreground">
                  Registrace
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </header>
  );
}
