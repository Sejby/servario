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
import toast from "react-hot-toast";

export default function ArticleDatagrid({ articles }: { articles: Article[] }) {
  const handleDelete = (_id: string) => {
    try {
      deleteArticleById(_id);
      toast.success("Článek byl úspěšně smazán");
    } catch (error) {
      toast.error("Během mazání článku došlo k chybě");
    }
  };
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
                    onClick={() => handleDelete(article._id)}
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
