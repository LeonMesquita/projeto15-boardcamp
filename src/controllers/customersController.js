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
    const id = req.params.id;
    console.log(id);

    try{
        const {rows: user} = await connection.query(`
            SELECT * FROM customers
            WHERE id=$1
        `, [id]);

        if(user.length === 0){
            return res.sendStatus(404);
        }
        return res.send(user);

    }catch(error){
        return res.sendStatus(500);
    }
}


export async function addCustomer(req, res){
    const customerBody = req.body;

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

/*

{
  "name": "João Alfredo",
  "phone": "21998899222",
  "cpf": "01234567890",
  "birthday": "1992-10-05"
}

 */