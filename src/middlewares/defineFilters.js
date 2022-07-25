export default function defineFilters(req, res, next){
    const offset = req.query["offset"];
    const limit = req.query["limit"];
    const orderBy = req.query["order"];
    const isDesc = req.query["desc"];
    const status = req.query["status"];
    const startDate = req.query["startDate"];
    let newQuery = '';

    if(status === "open")
        newQuery += ` WHERE "returnDate" is null `;
    else if(status === "closed")
        newQuery += ` WHERE "returnDate" is not null `;

    if(startDate){
        newQuery += status ? `AND "rentDate" >= ${`'${startDate}'`} ` : ` WHERE "rentDate" >= ${`'${startDate}'`} `;
    }

    if(orderBy)
        newQuery += ` ORDER BY ${orderBy}`;
    if(isDesc == 'true')
        newQuery += ` DESC `;
    if(limit)
        newQuery += ` LIMIT ${limit}`;
    if(offset)
        newQuery += ` OFFSET ${offset} `;
    

    res.locals.newQuery = newQuery;

    console.log(newQuery)

next();
}

// SELECT r.*, c.name as "customerName", g.name as "gameName", g."categoryId", cat.name as "categoryName" FROM rentals r
//     JOIN customers c
//     ON r."customerId" = c.id
//     JOIN games g
//     ON r."gameId" = g.id
//     JOIN categories cat
//     ON g."categoryId" = cat.id
//     WHERE "rentDate" >= '2022-07-24' and "returnDate" is null
//     ORDER BY "gameId" DESC  LIMIT 3 OFFSET 0;