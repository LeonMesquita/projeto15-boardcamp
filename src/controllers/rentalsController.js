import connection from "../dbStrategy/postgres.js";
import dayjs from 'dayjs';


export async function getRentals(req, res){
    const joinRentals = [];
    try{
        const {rows: rentals} = await connection.query(`
            SELECT r.*, c.name as "customerName", g.name as "gameName", g."categoryId", cat.name as "categoryName" FROM rentals r
            JOIN customers c
            ON r."customerId" = c.id
            JOIN games g
            ON r."gameId" = g.id
            JOIN categories cat
            ON g."categoryId" = cat.id
        `);
        for(let cont = 0; cont < rentals.length; cont++){
            const rental = rentals[cont];
            const customer = {
                id: rental.customerId,
                name: rental.customerName
            }
            const game = {
                id: rental.gameId,
                name: rental.gameName,
                categoryId: rental.categoryId,
                categoryName: rental.categoryName
            }
            joinRentals.push(
                {
                    ...rental,
                    customer,
                    game
                }
            );

            delete joinRentals[cont].customerName;
            delete joinRentals[cont].gameName;
            delete joinRentals[cont].categoryId;
            delete joinRentals[cont].categoryName;
        }

        res.send(joinRentals);
    }catch(error){
        res.sendStatus(500);
    }
}



export async function addRental(req, res){
    const rent = res.locals.rent;
    const game = res.locals.game;
    const rentBody = {
        ...rent,
        rentDate: dayjs().format("YYYY-MM-DD"),
        returnDate: null,
        originalPrice: Number(rent.daysRented) * Number(game[0].pricePerDay),
        delayFee: null
    }

   try{
    await connection.query(`
        INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "returnDate", "originalPrice", "delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [rentBody.customerId, rentBody.gameId, rentBody.daysRented, rentBody.rentDate, rentBody.returnDate, rentBody.originalPrice, rentBody.delayFee]);

    return res.sendStatus(201);

   }catch(error){

   }


    res.sendStatus(200);
}



export async function finishRental(req, res){
    const rental = res.locals.rental;
    if(rental[0].returnDate !== null){
        return res.sendStatus(400);
    }

    const game = res.locals.game;
    const returnDate = new Date();
    

    const passedDays = ((returnDate - rental[0].rentDate)/ (1000 * 60 * 60 * 24)).toFixed(0);
    const delayFee = passedDays <= rental[0].daysRented ? 0
    :
    (passedDays - rental[0].daysRented) * game[0].pricePerDay;
   try{
    await connection.query(`
        UPDATE rentals SET "returnDate" = $1, "delayFee" = $2
        WHERE id=$3
    `, [returnDate, delayFee, rental[0].id]);


    return res.sendStatus(200);

}catch(error){
    return res.sendStatus(500);
}

    

}



export async function deleteRental(req, res){
    const rental = res.locals.rental;
    if(rental[0].returnDate === null){
        return res.sendStatus(400);
    }

    try{
        await connection.query(`
            DELETE FROM rentals
            WHERE id = $1
        `, [rental[0].id]);
        return res.sendStatus(200);
    }catch(error){
        return res.sendStatus(500);
    }

}