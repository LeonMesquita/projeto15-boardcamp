import { Router} from 'express';
const router = Router();
import { getCustomers, addCustomer } from '../controllers/customersController.js';

router.get('/customers', getCustomers);
router.post('/customers', addCustomer);

export default router;