
import { getCategories, addCategorie } from '../controllers/categoriesController.js';
import validateCategory from '../middlewares/validateCategory.js';

import { Router} from 'express';
const router = Router();

router.get('/categories', getCategories);
router.post('/categories', validateCategory, addCategorie);

export default router;
