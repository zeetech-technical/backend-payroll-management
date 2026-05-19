import { Sequelize } from "sequelize";
import { envs } from "../config/env";
import logger from "../utils/logger";

const {
  postgresDatabase,
  postgresHost,
  postgresPort,
  postgresUser,
  postgresPassword,
} = envs;

export const sequelize = new Sequelize(
  postgresDatabase,
  postgresUser,
  postgresPassword,
  {
    host: postgresHost,
    port: +postgresPort,
    dialect: "postgres",
    logging: false,
  },
);

export const initDB = async (retries: number = 3) => {
  let attempts = 0;
  while (attempts < retries) {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ alter: true });
      logger.info(`[sequalize] running on port ${postgresPort}`);
      return;
    } catch (err) {
      attempts++;
      logger.error(`[sequalize] ${err}`);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
};
