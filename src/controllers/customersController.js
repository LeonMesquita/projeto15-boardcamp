import connection from "../dbStrategy/postgres.js";
import dayjs from 'dayjs';

export async function getCustomers(req, res){
    const cpf = req.query["cpf"];
    let newQuery = res.locals.newQuery;
    const cpfString = cpf ? `WHERE cpf LIKE $1` : ``;
    const query = `SELECT * FROM customers ${cpfString} ${newQuery}`;

    console.log(cpf)
    console.log(query)

    try{
        const {rows: customers} = !cpf ? await connection.query(query) : 
        await connection.query(query, [`${cpf}%`]);
        res.send(customers);
    }catch(error){
        res.sendStatus(500);
    }
}

export async function getCustomerById(req, res){
    const user = res.locals.user;
    try{
        
        return res.send(user[0]);

    }catch(error){
        return res.sendStatus(500);
    }
}


export async function addCustomer(req, res){
    const customerBody = res.locals.customerBody;
    const {rows: user} = await connection.query(`
        SELECT * FROM customers
        WHERE cpf=$1
    `, [customerBody.cpf]);
    if(user.length > 0){
        return res.sendStatus(409);
    }

    try{
        await connection.query(`
        INSERT INTO customers (name, phone, cpf, birthday) VALUES
        ($1, $2, $3, $4)`,
        [customerBody.name, customerBody.phone, customerBody.cpf, customerBody.birthday]
        );
        res.sendStatus(201);
    }catch(error){
        res.sendStatus(500);
    }

}

export async function updateCustomer(req, res){
   const customerBody = res.locals.customerBody;
    const user = res.locals.user;
    const {rows: findUser} = await connection.query(`
        SELECT * FROM customers WHERE cpf=$1
    `, [customerBody.cpf]);

    if (findUser.length > 0 && findUser[0].id !== user[0].id){
        return res.sendStatus(409);
    }
    try{
        await connection.query(`
            UPDATE "customers"
            SET "name" = $1, "phone" = $2, "cpf" = $3, "birthday" = $4
            WHERE "id"=$5
        `,[customerBody.name, customerBody.phone, customerBody.cpf, customerBody.birthday, user[0].id]);
    return res.sendStatus(201);
    }catch(error){
        return res.sendStatus(500);
    }
}