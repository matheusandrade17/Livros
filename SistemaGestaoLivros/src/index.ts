import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const livroSchema = z.object({
  titulo: z.string(),
  autor: z.string(),
  ano: z.number().int().min(1000).max(9999),
});

app.post('/livros', async (req, res) => {
  const resultado = livroSchema.safeParse(req.body);
  if (!resultado.success) {
    return res.status(400).json(resultado.error.format());
  }

  const novoLivro = await prisma.livro.create({
    data: resultado.data,
  });

  res.json(novoLivro);
});

app.get('/livros', async (req, res) => {
  const livros = await prisma.livro.findMany();
  res.json(livros);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

app.put('/livros/:id', async (req, res) => {
  const id = Number(req.params.id);
  const resultado = livroSchema.partial().safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json(resultado.error.format());
  }

  try {
    const livroAtualizado = await prisma.livro.update({
      where: { id },
      data: resultado.data,
    });
    res.json(livroAtualizado);
  } catch (error) {
    res.status(404).json({ erro: 'Livro não encontrado' });
  }
});

app.delete('/livros/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.livro.delete({ where: { id } });
    res.json({ mensagem: 'Livro deletado com sucesso' });
  } catch (error) {
    res.status(404).json({ erro: 'Livro não encontrado' });
  }
});

app.get('/livros/busca', async (req, res) => {
  const { autor, titulo } = req.query;

  const livros = await prisma.livro.findMany({
    where: {
      AND: [
        autor ? { autor: { contains: String(autor), mode: 'insensitive' } } : {},
        titulo ? { titulo: { contains: String(titulo), mode: 'insensitive' } } : {},
      ],
    },
  });

  res.json(livros);
});
