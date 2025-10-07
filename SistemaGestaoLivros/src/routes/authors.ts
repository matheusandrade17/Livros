import { Router } from 'express';
import * as ctrl from '../controllers/authorsController';
import { validate } from './validationMiddleware';
import { createAuthorSchema, updateAuthorSchema } from '../schemas/authorSchemas';


const router = Router();


router.get('/', ctrl.getAllAuthors);
router.get('/:id', ctrl.getAuthor);
router.post('/', validate(createAuthorSchema), ctrl.createAuthor);
router.put('/:id', validate(updateAuthorSchema), ctrl.updateAuthor);
router.delete('/:id', ctrl.deleteAuthor);


export default router;