import { getRentals, addRental, finishRental, deleteRental } from '../controllers/rentalsController.js';
import {validateRental, checkRental} from '../middlewares/validateRental.js';
import { Router} from 'express';
import defineFilters from  '../middlewares/defineFilters.js';

const router = Router();



router.get('/rentals',defineFilters, getRentals);
router.post('/rentals',validateRental, addRental);
router.post('/rentals/:id/return',checkRental, finishRental);
router.delete('/rentals/:id', checkRental, deleteRental);
export default router;