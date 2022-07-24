import { getRentals, addRental } from '../controllers/rentalsController.js';
import {validateRental} from '../middlewares/validateRental.js';
import { Router} from 'express';
const router = Router();



router.get('/rentals', getRentals);
router.post('/rentals',validateRental, addRental);
export default router;