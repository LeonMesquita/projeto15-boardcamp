import { Router} from 'express';
const router = Router();
import {addGame, getGames} from '../controllers/gamesController.js';
import validateGame from '../middlewares/validateGame.js';
import defineFilters from  '../middlewares/defineFilters.js';


router.post('/games', validateGame, addGame);
router.get('/games',defineFilters, getGames);

export default router;