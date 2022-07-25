function defineFilters(req, res, next){
    const offset = req.query["offset"];
    const limit = req.query["limit"];
    const orderBy = req.query["order"];
    const isDesc = req.query["desc"];
    let newQuery = '';

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

function defineRentalsFilters(req, res, next){
    const status = req.query["status"];
    const startDate = req.query["startDate"];
    let rentalQuery = '';

    if(status === "open")
    rentalQuery += ` WHERE "returnDate" is null `;
    else if(status === "closed")
    rentalQuery += ` WHERE "returnDate" is not null `;

    if(startDate){
        rentalQuery += status ? `AND "rentDate" >= ${`'${startDate}'`} ` : ` WHERE "rentDate" >= ${`'${startDate}'`} `;
    }

    res.locals.rentalQuery = rentalQuery;
    next();
}

export default [defineFilters, defineRentalsFilters];