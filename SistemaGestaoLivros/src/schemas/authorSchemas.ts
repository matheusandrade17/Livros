import { z } from 'zod';


export const createAuthorSchema = z.object({
body: z.object({
name: z.string().min(1),
bio: z.string().optional(),
})
});


export const updateAuthorSchema = z.object({
body: z.object({
name: z.string().min(1).optional(),
bio: z.string().optional(),
})
});