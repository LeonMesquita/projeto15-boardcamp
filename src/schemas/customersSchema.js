import joi from "joi";
export const customerSchema = joi.object({
    name: joi.string().required(),
    birthday: joi.date().iso(),
   phone: joi.string().min(10).max(11).pattern(/[0-9]{10,11}/).required(),
   cpf: joi.string().length(11).pattern(/[0-9]{11}/).required()
});