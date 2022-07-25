
import { getCategories, addCategorie } from '../controllers/categoriesController.js';
import validateCategory from '../middlewares/validateCategory.js';
import defineOffset from  '../middlewares/defineOffset.js';


import { Router} from 'express';
const router = Router();

router.get('/categories',defineOffset, getCategories);
router.post('/categories', validateCategory, addCategorie);

export default router;
