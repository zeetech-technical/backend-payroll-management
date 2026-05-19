import logger from "../../utils/logger";
import { Catalog, TypeCatalog } from "./catalog.model";

export const seedCatalog = async () => {
  await Catalog.destroy({ where: {}, truncate: true });
  const typeCatalog = await TypeCatalog.findAll({ where: {}, raw: true });
  const typeCatalogMap = Object.fromEntries(
    typeCatalog.map((t) => [t.name, t.id]),
  );

  await Catalog.bulkCreate(
    [
      { name: "Sueldo Base", typeCatalogId: typeCatalogMap["Percepción"] },
      { name: "Gratificación", typeCatalogId: typeCatalogMap["Percepción"] },
      { name: "Despensa", typeCatalogId: typeCatalogMap["Percepción"] },
      { name: "Bono", typeCatalogId: typeCatalogMap["Percepción"] },
      { name: "ISR", typeCatalogId: typeCatalogMap["Deducción"] },
      { name: "Seguro Social", typeCatalogId: typeCatalogMap["Deducción"] },
    ],
    { individualHooks: true },
  );
  logger.info(`[seed] catalogs successfully `);
};
