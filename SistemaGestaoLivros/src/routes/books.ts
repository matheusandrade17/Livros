import { Router } from "express";
import { prisma } from "../prismaClient";
import { z } from "zod";

const router = Router();

const bookSchema = z.object({
  title: z.string(),
  summary: z.string().optional(),
  isbn: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
  published: z.boolean().optional(),
  authorId: z.number(),
  categoryId: z.number(),
});

router.post("/", async (req, res) => {
  try {
    const data = bookSchema.parse(req.body);

    if (data.publishedAt) {
      data.publishedAt = new Date(data.publishedAt);
    }

    const book = await prisma.book.create({ data });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : error });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: { author: true, category: true },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: { author: true, category: true },
    });

    if (!book) return res.status(404).json({ error: "Livro não encontrado" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o livro" });
  }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const data = bookSchema.parse(req.body);

    if (data.publishedAt) {
      data.publishedAt = new Date(data.publishedAt);
    }

    const book = await prisma.book.update({
      where: { id },
      data,
    });

    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    await prisma.book.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Livro não encontrado" });
  }
});

export default router;
