import { Router} from 'express';
const router = Router();
import {addGame, getGames} from '../controllers/gamesController.js';
import validateGame from '../middlewares/validateGame.js';
import defineOffset from  '../middlewares/defineOffset.js';


router.post('/games', validateGame, addGame);
router.get('/games',defineOffset, getGames);

export default router;