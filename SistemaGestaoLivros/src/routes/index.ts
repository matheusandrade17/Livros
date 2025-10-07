import { Router } from 'express';
import books from './books';
import authors from './authors';
import categories from './categories';


const router = Router();


router.use('/books', books);
router.use('/authors', authors);
router.use('/categories', categories);


export default router;