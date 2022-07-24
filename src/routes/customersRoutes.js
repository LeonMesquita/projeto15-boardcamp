import { Router} from 'express';
const router = Router();
import { getCustomers, getCustomerById, addCustomer, updateCustomer } from '../controllers/customersController.js';
import {validateCustomer, checkCustomer} from '../middlewares/validateCustomer.js';

router.get('/customers', getCustomers);
router.get('/customers/:id', checkCustomer, getCustomerById);
router.post('/customers', validateCustomer, addCustomer);
router.put('/customers/:id',validateCustomer, checkCustomer, updateCustomer);

export default router;