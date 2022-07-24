import joi from "joi";
export const customerSchema = joi.object({
    name: joi.string().required(),
    birthday: joi.date().iso(),
   phone: joi.number().required(),
   cpf: joi.number().required()
});

//.regex(/^[0-9]$/)