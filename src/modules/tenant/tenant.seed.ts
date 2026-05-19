import logger from "../../utils/logger";
import { Tenant } from "./tenant.model";

export const seedTenants = async () => {
  await Tenant.destroy({ where: {}, truncate: true });

  await Tenant.bulkCreate([
    { name: "1Rocket Laps", email: "tenant1@test.com" },
    { name: "Digital Pineapple", email: "tenant2@test.com" },
  ]);

  logger.info("[seed]:init tenant seed");

  // console.log("Tenants seed ...");
};
