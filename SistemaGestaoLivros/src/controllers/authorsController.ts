import { Request, Response } from 'express';
import prisma from '../prismaClient';


export const getAllAuthors = async (req: Request, res: Response) => {
const authors = await prisma.author.findMany();
res.json(authors);
};


export const getAuthor = async (req: Request, res: Response) => {
const id = Number(req.params.id);
const author = await prisma.author.findUnique({
where: { id },
include: { books: true }, // inclui livros deste autor
});
if (!author) return res.status(404).json({ message: 'Author not found' });
res.json(author);
};


export const createAuthor = async (req: Request, res: Response) => {
const { name, bio } = req.body;
const author = await prisma.author.create({ data: { name, bio } });
res.status(201).json(author);
};


export const updateAuthor = async (req: Request, res: Response) => {
const id = Number(req.params.id);
const data = req.body;
const author = await prisma.author.update({ where: { id }, data });
res.json(author);
};


export const deleteAuthor = async (req: Request, res: Response) => {
const id = Number(req.params.id);
await prisma.author.delete({ where: { id } });
res.status(204).send();
};