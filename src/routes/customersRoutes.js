import { Router} from 'express';
const router = Router();
import { getCustomers, getCustomerById, addCustomer } from '../controllers/customersController.js';

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerById);
router.post('/customers', addCustomer);

export default router;