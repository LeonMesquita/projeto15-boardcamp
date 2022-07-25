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