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
       // console.log(rentals)

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

       

       console.log(joinRentals)
        res.send(joinRentals);
    }catch(error){
        res.sendStatus(500);
    }
}
/*
    game: {
      id: 1,
      name: 'Banco Imobiliário',
      categoryId: 1,
      categoryName: 'Estratégia'
    }
*/

/*
[
  {
    id: 1,
    customerId: 1,
    gameId: 1,
    rentDate: '2021-06-20',
    daysRented: 3,
    returnDate: null, // troca pra uma data quando já devolvido
    originalPrice: 4500,
    delayFee: null,
    customer: {
     id: 1,
     name: 'João Alfredo'
    },
    game: {
      id: 1,
      name: 'Banco Imobiliário',
      categoryId: 1,
      categoryName: 'Estratégia'
    }
  }
]

*/












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
   // console.log(rentBody)
   // console.log(game)
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


/*

{
  id: 1,
  customerId: 1,
  gameId: 1,
  rentDate: '2021-06-20',    // data em que o aluguel foi feito
  daysRented: 3,             // por quantos dias o cliente agendou o aluguel
  returnDate: null,          // data que o cliente devolveu o jogo (null enquanto não devolvido)
  originalPrice: 4500,       // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
  delayFee: null             // multa total paga por atraso (dias que passaram do prazo vezes o preço por dia do jogo)
}

*/