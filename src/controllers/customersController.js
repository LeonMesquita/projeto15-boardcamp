import connection from "../dbStrategy/postgres.js";


export async function getCustomers(req, res){

    const cpf = req.query["cpf"];

    try{
        const {rows: customers} = !cpf ? await connection.query(`
        SELECT * FROM customers
        `) : await connection.query(`
        SELECT * FROM customers
        WHERE cpf LIKE $1
        `, [`${cpf}%`]);
        res.send(customers);
    }catch(error){
        res.sendStatus(500);
    }
}

export async function getCustomerById(req, res){
    const user = res.locals.user;
    try{
        
        return res.send(user);

    }catch(error){
        return res.sendStatus(500);
    }
}


export async function addCustomer(req, res){
    const customerBody = res.locals.customerBody;

    try{
        await connection.query(`
        INSERT INTO customers (name, phone, cpf, birthday) VALUES
        ($1, $2, $3, $4)`,
        [customerBody.name, customerBody.phone, customerBody.cpf, customerBody.birthday]
        );
        res.sendStatus(201);
    }catch(error){
        console.log(error)
        res.sendStatus(500);
    }

}

export async function updateCustomer(req, res){
    const customerBody = res.locals.customerBody;
    const user = res.locals.user;
console.log(user);
    console.log(customerBody);

    try{
        await connection.connect();
        await connection.query(`
            UPDATE "customers"
            SET "name" = $1, "phone" = $2, "cpf" = $3, "birthday" = $4
            WHERE "id" =$5
        `,[customerBody.name, customerBody.phone, customerBody.cpf, customerBody.birthday, user.id]);
    return res.sendStatus(201);
    }catch(error){
        return res.sendStatus(500);
    }
}

/*

{
  "name": "João Alfredo",
  "phone": "21998899222",
  "cpf": "01234567890",
  "birthday": "1992-10-05"
}

 */