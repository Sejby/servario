import React from "react";
import { Button, Link } from "@/lib/next-ui/next-ui";

export default function Home() {
  return (
    <div className="text-left max-w-[550px] mx-auto">
      <h1 className="text-3xl mb-2">Vítejte na naší platformě!</h1>
      <h3 className="text-medium">
        Připojte se k nám a objevte nové možnosti.
      </h3>

      <Button
        as={Link}
        href="/signin"
        color="success"
        variant="bordered"
        className="mt-5 px-8 mr-2"
      >
        Přihlášení
      </Button>
      <Button
        as={Link}
        href="/signup"
        variant="flat"
        color="danger"
        className="mt-5 px-8 mr-2"
      >
        Registrace
      </Button>
    </div>
  );
}
