import { Request, Response } from 'express';
import prisma from '../prismaClient';


export const getAllCategories = async (req: Request, res: Response) => {
const categories = await prisma.category.findMany();
res.json(categories);
};


export const getCategory = async (req: Request, res: Response) => {
const id = Number(req.params.id);
const category = await prisma.category.findUnique({
where: { id },
include: { books: true },
});
if (!category) return res.status(404).json({ message: 'Category not found' });
res.json(category);
};


export const createCategory = async (req: Request, res: Response) => {
const { name, description } = req.body;
const category = await prisma.category.create({ data: { name, description } });
res.status(201).json(category);
};


export const updateCategory = async (req: Request, res: Response) => {
const id = Number(req.params.id);
const data = req.body;
const category = await prisma.category.update({ where: { id }, data });
res.json(category);
};


export const deleteCategory = async (req: Request, res: Response) => {
const id = Number(req.params.id);
await prisma.category.delete({ where: { id } });
res.status(204).send();
};