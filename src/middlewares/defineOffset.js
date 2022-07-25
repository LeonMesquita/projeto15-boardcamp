export default function defineOffset(req, res, next){
    const offset = req.query["offset"];
    const limit = req.query["limit"];
    let newQuery = '';
    if(limit)
        newQuery += `LIMIT ${limit}`;
    if(offset)
        newQuery += ` OFFSET ${offset} `;
    

    res.locals.newQuery = newQuery;

next();
}