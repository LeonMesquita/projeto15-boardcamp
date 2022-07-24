import connection from "../dbStrategy/postgres.js";
import { customerSchema } from "../schemas/customersSchema.js";
import dayjs from 'dayjs';

export async function validateCustomer(req, res, next){

    const user = res.locals.user;
    
    const customerBody = {
        ...req.body,
        phone: req.body.phone.replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll(' ', ''),
        cpf: req.body.cpf.replaceAll('.', '').replaceAll('-', '').replaceAll(' ', ''),
        birthday: dayjs(req.body.birthday).format('YYYY-MM-DD').replaceAll('/', '-').replaceAll(' ', '')
    };
    const validate = customerSchema.validate(customerBody);
    if (validate.error){
        return res.sendStatus(400);
    }

    const {rows: findUser} = await connection.query(`
        SELECT * FROM customers
        WHERE cpf=$1
    `, [customerBody.cpf]);
    
    // if(findUser.length > 0 && findUser[0].id !== user[0].id){
    //     return res.sendStatus(409);
    // }

    res.locals.customerBody = customerBody;
   next();


}

export async function checkCustomer(req, res, next){
    const id = req.params.id;
    const {rows: user} = await connection.query(`
            SELECT * FROM customers
            WHERE id=$1
        `, [id]);
        if(user.length === 0){
            return res.sendStatus(404);
        }
    res.locals.user = user;
next();
}

