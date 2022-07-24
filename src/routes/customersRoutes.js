import { Router} from 'express';
const router = Router();
import { getCustomers, getCustomerById, addCustomer } from '../controllers/customersController.js';
import validateCustomer from '../middlewares/validateCustomer.js';

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerById);
router.post('/customers', validateCustomer, addCustomer);

export default router;