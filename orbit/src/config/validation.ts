import * as Joi from 'joi';

export const validationSchema = Joi.object({
    MONGODB_USER: Joi.string().required(),
    MONGODB_PASSWORD: Joi.string().required(),
    MONGODB_HOST: Joi.string().required(),
    MONGODB_DEFAULT_DB: Joi.string().required(),

    PORT: Joi.number().default(3000),
});