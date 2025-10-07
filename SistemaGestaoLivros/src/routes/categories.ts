import { Router } from 'express';
import * as ctrl from '../controllers/categoriesController';
import { validate } from './validationMiddleware';
import { createCategorySchema, updateCategorySchema } from '../schemas/categorySchemas';


const router = Router();


router.get('/', ctrl.getAllCategories);
router.get('/:id', ctrl.getCategory);
router.post('/', validate(createCategorySchema), ctrl.createCategory);
router.put('/:id', validate(updateCategorySchema), ctrl.updateCategory);
router.delete('/:id', ctrl.deleteCategory);


export default router;