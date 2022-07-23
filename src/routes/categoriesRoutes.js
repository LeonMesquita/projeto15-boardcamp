
import { getCategories, addCategorie } from '../controllers/categoriesController.js';
import { Router} from 'express';
const router = Router();

router.get('/categories', getCategories);
router.post('/categories', addCategorie);

export default router;
