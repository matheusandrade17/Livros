import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';


export const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
try {
const result = schema.parse({ body: req.body, query: req.query, params: req.params });
// replace body if parsed
if (result.body) req.body = result.body;
next();
} catch (err: any) {
return res.status(400).json({ error: err.errors || err.message });
}
};