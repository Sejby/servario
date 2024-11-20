"use client";

import Link from "next/link";
import React from "react";

export default function CreateArticleLink() {
  return <Link href={"/articles/create"}>Vytvořit článek</Link>;
}
