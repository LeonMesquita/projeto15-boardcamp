import express from 'express';
import cors from 'cors';
import categoriesRoutes from './routes/categoriesRoutes.js';
import gamesRoutes from './routes/gamesRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());


app.use(categoriesRoutes);
app.use(gamesRoutes);


app.listen(4000, ( ) => {console.log('server running on port 4000')})