import { Router} from 'express';
const router = Router();
import { getCustomers, getCustomerById, addCustomer, updateCustomer } from '../controllers/customersController.js';
import {validateCustomer, checkCustomer} from '../middlewares/validateCustomer.js';
import defineFilters from  '../middlewares/defineFilters.js';


router.get('/customers',defineFilters, getCustomers);
router.get('/customers/:id', checkCustomer, getCustomerById);
router.post('/customers', validateCustomer, addCustomer);
router.put('/customers/:id', checkCustomer,validateCustomer, updateCustomer);

export default router;