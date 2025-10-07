import { z } from 'zod';


export const createBookSchema = z.object({
body: z.object({
title: z.string().min(1),
summary: z.string().optional(),
isbn: z.string().min(10),
publishedAt: z.string().optional(), // ISO date string
authorId: z.number().int(),
categoryId: z.number().int(),
})
});


export const updateBookSchema = z.object({
body: z.object({
title: z.string().min(1).optional(),
summary: z.string().optional(),
isbn: z.string().min(10).optional(),
publishedAt: z.string().optional(),
authorId: z.number().int().optional(),
categoryId: z.number().int().optional(),
})
});