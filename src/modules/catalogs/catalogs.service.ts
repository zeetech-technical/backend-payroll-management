import logger from "../../utils/logger";
import { Catalog, TypeCatalog } from "./catalog.model";
import { ICatalogSchemaBody } from "./catalog.schema";

export class CatalogsService {
  async getCatalogTypes() {
    try {
      const types = await TypeCatalog.findAll();
      return types;
    } catch (error) {
      logger.error(`Error al obtener los tipos de catálogos`, error);
      throw error;
    }
  }

  async getAllCatalog() {
    try {
      const catalogs = await Catalog.findAll({
        paranoid: false,
        include: [
          {
            model: TypeCatalog,
            as: "typeCatalog",
            attributes: ["name"],
          },
        ],
        order: [["id", "ASC"]],
      });
      return catalogs;
    } catch (error) {
      logger.error(`Error al obtener los catálogos`, error);
      throw error;
    }
  }

  async addCatalog(data: ICatalogSchemaBody) {
    try {
      const result = await Catalog.create(data);
      await result.reload({
        include: [
          {
            model: TypeCatalog,
            as: "typeCatalog",
            attributes: ["name"],
          },
        ],
      });

      return result;
    } catch (error) {
      logger.error(`Error al agregar el catálogo`, error);
      throw error;
    }
  }

  async deleteCatalogLogically(id: number) {
    try {
      const result = await Catalog.destroy({
        where: { id },
      });
      return result;
    } catch (error) {}
  }

  async restoreCatalog(id: number) {
    try {
      const result = await Catalog.restore({ where: { id } });
      return result;
    } catch (error) {
      logger.error(`Error al restaurar el catálogo`, error);
      throw error;
    }
  }

  async getTypeCatalogById(id: number) {
    try {
      const type = await TypeCatalog.findByPk(id);
      return type;
    } catch (error) {
      return null;
    }
  }
}
