import joi from "joi";

export const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: 3,
    categoryId: 1,
    pricePerDay: 1500,
});