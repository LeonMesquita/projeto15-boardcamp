import connection from "../dbStrategy/postgres.js";



export async function getCategories(req, res){
    try{
        const {rows: categories} = await connection.query(`SELECT * FROM categories`);
        res.send(categories);


    }catch(error){
        res.sendStatus(500);
    }
}

export async function addCategorie(req, res){
    const {name} = req.body;

    try{
        await connection.query(`
        INSERT INTO categories (name) VALUES ($1)
        `, [name]);
        res.sendStatus(200);

    }catch(error){
        res.sendStatus(500);
    }
}