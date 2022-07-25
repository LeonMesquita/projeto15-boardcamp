
import { getCategories, addCategorie } from '../controllers/categoriesController.js';
import validateCategory from '../middlewares/validateCategory.js';
import defineFilters from  '../middlewares/defineFilters.js';


import { Router} from 'express';
const router = Router();

router.get('/categories',defineFilters, getCategories);
router.post('/categories', validateCategory, addCategorie);

export default router;
