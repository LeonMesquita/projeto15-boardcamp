import connection from "../dbStrategy/postgres.js";
import { customerSchema } from "../schemas/customersSchema.js";


export default async function validateCustomer(req, res, next){
    const customerBody = {
        ...req.body,
        phone: req.body.phone.replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll(' ', ''),
        cpf: req.body.cpf.replaceAll('.', '').replaceAll('-', '').replaceAll(' ', ''),
        birthday: req.body.birthday.replaceAll('/', '-').replaceAll(' ', '')
    };
    const validate = customerSchema.validate(customerBody);
    if (validate.error){
        return res.sendStatus(400);
    }
    const {rows: user} = await connection.query(`
        SELECT * FROM customers
        WHERE cpf=$1
    `, [customerBody.cpf]);
    if(user.length > 0){
        return res.sendStatus(409);
    }
    res.locals.customerBody = customerBody;
   next();
    


}