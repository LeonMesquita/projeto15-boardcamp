import connection from "../dbStrategy/postgres.js";



export async function getGames(req, res){
    try{
        const {rows: games} = await connection.query(`
        SELECT g.*, c.name as "categoryName" FROM games g
        JOIN categories c
        ON g."categoryId" = c.id
        `);
        res.send(games);
    }catch(error){

    }
}

export async function addGame(req, res){
    const gameBody = res.locals.gameBody;
    try{
        await connection.query(`
            INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)
        `,
        [gameBody.name, gameBody.image, gameBody.stockTotal, gameBody.categoryId, gameBody.pricePerDay]
        );
        res.sendStatus(201);

    }catch(error){
        return res.sendStatus(500);
    }
}

/*
{
    "name": "Banco Imobiliário",
    "image": "http://",
    "stockTotal": 3,
    "categoryId": 1,
    "pricePerDay": 1500
  }

  */