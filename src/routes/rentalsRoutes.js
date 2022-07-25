import { getRentals, addRental, finishRental, deleteRental } from '../controllers/rentalsController.js';
import {validateRental, checkRental} from '../middlewares/validateRental.js';
import { Router} from 'express';
import defineOffset from  '../middlewares/defineOffset.js';

const router = Router();



router.get('/rentals',defineOffset, getRentals);
router.post('/rentals',validateRental, addRental);
router.post('/rentals/:id/return',checkRental, finishRental);
router.delete('/rentals/:id', checkRental, deleteRental);
export default router;