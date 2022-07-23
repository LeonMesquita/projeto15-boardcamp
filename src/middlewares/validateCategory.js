import connection from "../dbStrategy/postgres.js";
import { categorySchema } from "../schemas/categoriesSchema.js";


export default async function validateCategory(req, res, next){
    const {name} = req.body;
    const validate =  categorySchema.validate({name});
    if(validate.error) {
        return res.status(400).send("O nome da categoria deve ser informado!");
    }

    const {rows: category} = await connection.query(`
        SELECT * FROM categories
        WHERE name=$1
    `, [name]);

    if(category.length > 0){
        return res.sendStatus(409);
    }


    res.locals.name = name;
    next();
}