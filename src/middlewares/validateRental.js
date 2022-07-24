import connection from "../dbStrategy/postgres.js";
import { rentalSchema } from "../schemas/rentalsSchema.js";

export async function validateRental(req, res, next){
    const rent = req.body;
    
    const {rows: customer} = await connection.query(`
        SELECT * FROM customers WHERE id=$1
    `, [rent.customerId]);

    const {rows: game} = await connection.query(`
        SELECT * FROM games WHERE id=$1
    `, [rent.gameId]);

    const {rows: rentals} = await connection.query(`
        SELECT * FROM rentals r
        JOIN games g
        ON r."gameId" = g.id
        WHERE g.id = $1
    `, [rent.gameId]);

   // console.log(customer);
  //  console.log(game)
  console.log(rentals.length);
  const validate = rentalSchema.validate(rent);

    if(validate.error || customer.length === 0 || game.length === 0 || rentals.length >= game[0].stockTotal){
        return res.sendStatus(400);
    }

    res.locals.rent = rent;
    res.locals.game = game;
    next();
}