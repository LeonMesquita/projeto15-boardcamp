import { Router} from 'express';
const router = Router();
import {addGame, getGames} from '../controllers/gamesController.js';
import validateGame from '../middlewares/validateGame.js';

router.post('/games', validateGame, addGame);
router.get('/games', getGames);

export default router;