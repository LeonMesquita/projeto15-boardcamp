import { Router} from 'express';
const router = Router();
import { getCustomers, getCustomerById, addCustomer, updateCustomer } from '../controllers/customersController.js';
import {validateCustomer, checkCustomer} from '../middlewares/validateCustomer.js';
import defineOffset from  '../middlewares/defineOffset.js';


router.get('/customers',defineOffset, getCustomers);
router.get('/customers/:id', checkCustomer, getCustomerById);
router.post('/customers', validateCustomer, addCustomer);
router.put('/customers/:id', checkCustomer,validateCustomer, updateCustomer);

export default router;