import { Catalog, TypeCatalog } from "../catalogs/catalog.model";
import { Tabulador, TabuladorConfig } from "./tabulador.model";
import { ITCreateTabuladorConfigBody } from "./tabulador.schema";

export class TabuladorService {
  async getAllTabulador() {
    const tabuladores = await Tabulador.findAll({
      include: [
        {
          model: TabuladorConfig,
          as: "tabuladorConfig",
          attributes: ["id", "monto", "porcentaje"],
          include: [
            {
              model: Catalog,
              as: "catalog",
              attributes: ["id", "name"],
              include: [
                {
                  model: TypeCatalog,
                  as: "typeCatalog",
                  attributes: ["id", "name","factor"],
                },
              ],
            },
          ],
        },
      ],
      order: [[{ model: TabuladorConfig, as: "tabuladorConfig" }, "id", "ASC"]],
    });
    return tabuladores;
  }
  async getTabuladorById(id: number) {
    const tabulador = await Tabulador.findByPk(id, {
      include: [
        {
          model: TabuladorConfig,
          as: "tabuladorConfig",
          attributes: ["id", "monto", "porcentaje"],
          include: [
            {
              model: Catalog,
              as: "catalog",
              attributes: ["id", "name"],
              include: [
                {
                  model: TypeCatalog,
                  as: "typeCatalog",
                  attributes: ["id", "name","factor"],
                },
              ],
            },
          ],
        },
      ],
    });
    return tabulador;
  }
  async getAllTabuladorConfig() {
    const tabuladorConfig = await TabuladorConfig.findAll();
    return tabuladorConfig;
  }
  async createTabulador() {
    const tabulador = await Tabulador.create();
    return tabulador;
  }
  async createTabuladorConfig(data: any[]) {
    const tabuladorConfig = await TabuladorConfig.bulkCreate(data);
    return tabuladorConfig;
  }
  async deleteTabulador(id: number) {
    const tabulador = await Tabulador.destroy({ where: { id } });
    return tabulador;
  }
  async deleteTabuladorConfig(id: number) {
    const tabuladorConfig = await TabuladorConfig.destroy({ where: { id } });
    return tabuladorConfig;
  }
  // async updateTabulador(id: number) {
  //   const tabulador = await Tabulador.update({},{ where: { id } });
  //   return tabulador;
  // }
  // async updateTabuladorConfig(id: number) {
  //   const tabuladorConfig = await TabuladorConfig.update({},{ where: { id } });
  //   return tabuladorConfig;
  // }
}
