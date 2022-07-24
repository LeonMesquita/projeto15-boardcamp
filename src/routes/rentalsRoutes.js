import { getRentals, addRental, finishRental, deleteRental } from '../controllers/rentalsController.js';
import {validateRental, checkRental} from '../middlewares/validateRental.js';
import { Router} from 'express';
const router = Router();



router.get('/rentals', getRentals);
router.post('/rentals',validateRental, addRental);
router.post('/rentals/:id/return',checkRental, finishRental);
export default router;