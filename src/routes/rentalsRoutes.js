import { getRentals, addRental, finishRental, deleteRental, getMetrics } from '../controllers/rentalsController.js';
import {validateRental, checkRental} from '../middlewares/validateRental.js';
import { Router} from 'express';
import defineFilters from  '../middlewares/defineFilters.js';
import defineRentalsFilters from  '../middlewares/defineFilters.js';
const router = Router();



router.get('/rentals',defineFilters, defineRentalsFilters, getRentals);
router.post('/rentals',validateRental, addRental);
router.post('/rentals/:id/return',checkRental, finishRental);
router.delete('/rentals/:id', checkRental, deleteRental);
router.get('/rentals/metrics', getMetrics);
export default router;