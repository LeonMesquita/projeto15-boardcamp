import connection from "../dbStrategy/postgres.js";
import { gameSchema } from "../schemas/gamesSchema.js";

export default async function validateGame(req, res, next){
    const gameBody = {
        ...req.body,
        stockTotal: Number(req.body.stockTotal),
        categoryId: Number(req.body.categoryId),
        pricePerDay: Number(req.body.pricePerDay),
    }

    const validate = gameSchema.validate(gameBody);
    const {rows: category} = await connection.query(`
        SELECT * FROM categories WHERE id=$1
    `,
        [gameBody.categoryId]
    );

    const {rows: game} = await connection.query(`
        SELECT * FROM games WHERE name=$1
    `,
        [gameBody.name]
    );


    if(validate.error || !category || category.length===0) {
        return res.sendStatus(400);
    }

    if(game.length > 0){
        return res.sendStatus(409);
    }

    res.locals.gameBody = gameBody;
    next();
}
