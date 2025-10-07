import { z } from 'zod';


export const createCategorySchema = z.object({
body: z.object({
name: z.string().min(1),
description: z.string().optional(),
})
});


export const updateCategorySchema = z.object({
body: z.object({
name: z.string().min(1).optional(),
description: z.string().optional(),
})
});