import { request } from "express";
import connection from "../dbStrategy/postgres.js";



export async function getGames(req, res){
    const name = req.query["name"];
    const query = `
        SELECT g.*, c.name as "categoryName" FROM games g
        JOIN categories c
        ON g."categoryId" = c.id`
    try{
        const {rows: games} = name ?
        await connection.query(`
        ${query}
        WHERE g.name LIKE $1
        `,
        [`%${name}%`]
        ) :
        await connection.query(query);
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