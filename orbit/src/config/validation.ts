import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),

  MONGODB_USER: Joi.string().required(),
  MONGODB_PASSWORD: Joi.string().required(),
  MONGODB_HOST: Joi.string().required(),
  MONGODB_DEFAULT_DB: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('60m'),
  JWT_ALGORITHM: Joi.string().default('HS256'),
  JWT_AUDIENCE: Joi.string().allow(''),
  JWT_ISSUER: Joi.string().allow(''),
});
