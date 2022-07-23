import { Router} from 'express';
import { getCategories, addCategorie } from '../controllers/categoriesController.js';
const router = Router();

router.get('/categories', getCategories);
router.post('/categories', addCategorie);

export default router;
