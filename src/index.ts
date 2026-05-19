import { app } from "./app";
import { envs } from "./config/env";
import { initDB } from "./db/sequelize";
import logger from "./utils/logger";

const start = async () => {
  try {
    app.listen(envs.port, () => {
      logger.info(`[server] running on port ${envs.port}`);
    });
    await initDB();
  } catch (error) {
    logger.error("[server] error starting", error);
    process.exit(1);
  }
};

start();
