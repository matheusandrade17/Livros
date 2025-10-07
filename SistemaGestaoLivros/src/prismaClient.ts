import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  const authorExists = await prisma.author.findUnique({ where: { id: 1 } });
  if (!authorExists) {
    await prisma.author.create({ data: { name: "J.R.R. Tolkien" } });
  }

  const categoryExists = await prisma.category.findUnique({ where: { id: 1 } });
  if (!categoryExists) {
    await prisma.category.create({ data: { name: "Fantasia" } });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => {
  });
