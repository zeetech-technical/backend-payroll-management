/* istanbul ignore file */
import * as joi from "joi";
import "dotenv/config";

interface IPGDBENVS {
  POSTGRES_HOST: string;
  POSTGRES_PORT: string;
  POSTGRES_DB: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
}

interface IENVS extends IPGDBENVS {
  PORT: string;
  NODE_ENV: "production" | "development";
  ORIGINS: string[];
  JWT_SECRET:string
}

const envsSchema = joi
  .object({
    PORT: joi.string().required(),
    NODE_ENV: joi.string().valid("production", "development").required(),
    ORIGINS: joi.array().items(joi.string()).required(),
    JWT_SECRET: joi.string().required(),
    POSTGRES_HOST: joi.string().required(),
    POSTGRES_PORT: joi.string().required(),
    POSTGRES_DB: joi.string().required(),
    POSTGRES_USER: joi.string().required(),
    POSTGRES_PASSWORD: joi.string().required(),
  })
  .unknown();

const { error, value } = envsSchema.validate({
  ...process.env,
  ORIGINS: process.env.ORIGINS?.split(",").map((o) => o.trim()),
});

if (error) {
  throw new Error(`Config Validation error: ${error.message}`);
}

export const envVars: IENVS = value;

export const envs = {
  port: envVars.PORT,
  nodeEnv: envVars.NODE_ENV,
  origins: envVars.ORIGINS,
  jwtSecret:envVars.JWT_SECRET,
  postgresHost: envVars.POSTGRES_HOST,
  postgresPort: envVars.POSTGRES_PORT,
  postgresDatabase: envVars.POSTGRES_DB,
  postgresUser: envVars.POSTGRES_USER,
  postgresPassword: envVars.POSTGRES_PASSWORD,
};
