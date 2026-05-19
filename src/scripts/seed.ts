import { sequelize } from "../db/sequelize";
import logger from "../utils/logger";

import { seedPermissions } from "../modules/permissions/permissions.seed";
import { seedRoles } from "../modules/roles/roles.seed";
import { seedUsers } from "../modules/user/user.seed";

const seed = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await Promise.all([seedPermissions(), seedRoles(), seedUsers()]);
    logger.info("[seed] seeds finished successfully");
    process.exit(0);
  } catch (error) {
    logger.error("[seed] error", error);
    process.exit(1);
  }
};

seed();
