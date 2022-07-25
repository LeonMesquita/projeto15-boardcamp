export default function defineFilters(req, res, next){
    const offset = req.query["offset"];
    const limit = req.query["limit"];
    const orderBy = req.query["order"];
    const isDesc = req.query["desc"];
    let newQuery = '';
    if(orderBy)
        newQuery += `ORDER BY ${orderBy}`;
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

//SELECT * FROM customers WHERE cpf LIKE '88%' order by name  limit 5 offset 3