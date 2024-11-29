"use client";

import {
  Article,
  deleteArticleById,
} from "@/actions/articles/articles-actions";
import { Button, Tooltip } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import Link from "next/link";

export default function ArticleDatagrid({ articles }: { articles: Article[] }) {
  return (
    <div>
      <Table aria-label="List of articles">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold">Žádné články nenalezeny</p>
            </div>
          }
        >
          {articles.map((article: Article) => (
            <TableRow key={article._id}>
              <TableCell>{article._id}</TableCell>
              <TableCell>{article.title}</TableCell>
              <TableCell>{article.createdAt}</TableCell>
              <TableCell className="space-x-2">
                <Tooltip content="Zobrazit detail článku">
                  <Link href={`/articles/${article.slug}`}>
                    <Button color="primary" variant="flat">
                      Detail
                    </Button>
                  </Link>
                </Tooltip>
                <Tooltip content="Upravit článek">
                  <Link href={`/articles/edit/${article._id}`}>
                    <Button color="warning" variant="flat">
                      Upravit
                    </Button>
                  </Link>
                </Tooltip>
                <Tooltip content="Smazat článek">
                  <Button
                    onClick={() => deleteArticleById(article._id)}
                    color="danger"
                    variant="flat"
                  >
                    Smazat
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
