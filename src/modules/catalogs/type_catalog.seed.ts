import logger from "../../utils/logger";
import { TypeCatalog } from "./catalog.model";

export const seedTypeCatalog = async () => {
  await TypeCatalog.bulkCreate(
    [
      {
        name: "Percepción",
        factor: "1"
      },
      {
        name: "Deducción",
        factor: "-1"
      },
    ],
    { individualHooks: true },
  );

  logger.info(`[seed] type catalog successfully `);
};
