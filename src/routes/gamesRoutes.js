import { Router} from 'express';
const router = Router();
import {addGame, getGames} from '../controllers/gamesController.js';

router.post('/games', addGame);
router.get('/games', getGames);

export default router;