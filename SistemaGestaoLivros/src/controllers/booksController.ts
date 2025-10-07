import { Request, Response } from 'express';
import prisma from '../prismaClient';


export const getAllBooks = async (req: Request, res: Response) => {
const books = await prisma.book.findMany();
res.json(books);
};


export const getBook = async (req: Request, res: Response) => {
const id = Number(req.params.id);
// uso do include para retornar dados relacionados (Author e Category) -> requisito 3
const book = await prisma.book.findUnique({
where: { id },
include: { author: true, category: true },
});
if (!book) return res.status(404).json({ message: 'Book not found' });
res.json(book);
};


export const createBook = async (req: Request, res: Response) => {
const { title, summary, isbn, publishedAt, authorId, categoryId } = req.body;
const book = await prisma.book.create({
data: {
title,
summary,
isbn,
publishedAt: publishedAt ? new Date(publishedAt) : undefined,
author: { connect: { id: authorId } },
category: { connect: { id: categoryId } },
}
});
res.status(201).json(book);
};


export const updateBook = async (req: Request, res: Response) => {
const id = Number(req.params.id);
const data = req.body;
if (data.publishedAt) data.publishedAt = new Date(data.publishedAt);
// se houver authorId/categoryId, transformamos para connect
const updateData: any = { ...data };
if (data.authorId) { updateData.author = { connect: { id: data.authorId } }; delete updateData.authorId; }
if (data.categoryId) { updateData.category = { connect: { id: data.categoryId } }; delete updateData.categoryId; }


const book = await prisma.book.update({ where: { id }, data: updateData });
res.json(book);
};


export const deleteBook = async (req: Request, res: Response) => {
const id = Number(req.params.id);
await prisma.book.delete({ where: { id } });
res.status(204).send();
};