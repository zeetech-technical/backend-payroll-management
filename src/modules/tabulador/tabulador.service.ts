import { Catalog, TypeCatalog } from "../catalogs/catalog.model";
import { Position } from "../position/position.model";
import { User } from "../user/user.model";
import { Tabulador, TabuladorConfig } from "./tabulador.model";

export class TabuladorService {
  private includeQuery = [
    {
      model: Position,
      as: "position",
      attributes: ["id", "name"],
    },
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
              attributes: ["id", "name", "factor"],
            },
          ],
        },
      ],
    },
  ];
  async getAllTabulador() {
    const tabuladores = await Tabulador.findAll({
      include: this.includeQuery,
      order: [[{ model: TabuladorConfig, as: "tabuladorConfig" }, "id", "ASC"]],
    });
    return tabuladores;
  }

  async getAllTabuladorStats() {
    const tabuladores = await Tabulador.findAll({
      include: [
        {
          model: Position,
          as: "position",
          required: true,
          attributes: ["id", "name"],
          include: [
            {
              model: User,
              as: "user",
              required: true,
              attributes: ["id", "name"],
            },
          ],
        },
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
                  attributes: ["id", "name", "factor"],
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
      include: this.includeQuery,
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

  async getTabuladorUserStats(userId: number): Promise<any[]> {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Position,
          as: "position",
          // include: [
          //   {
          //     model: Tabulador,
          //     as: "tabulador",
          //   },
          // ],
        },
      ],
    });

    const tabularId =
      user && user.get({ plain: true })["position"]["tabuladorId"];
    console.log(tabularId);

    if (!tabularId) return [];
    const tabuladores = await Tabulador.findAll({
      where: { id: tabularId },
      include: [
        {
          model: Position,
          as: "position",
          required: true,
          attributes: ["id", "name"],
          include: [
            {
              model: User,
              as: "user",
              required: true,
              attributes: ["id", "name"],
            },
          ],
        },
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
                  attributes: ["id", "name", "factor"],
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
  // async updateTabulador(id: number) {
  //   const tabulador = await Tabulador.update({},{ where: { id } });
  //   return tabulador;
  // }
  // async updateTabuladorConfig(id: number) {
  //   const tabuladorConfig = await TabuladorConfig.update({},{ where: { id } });
  //   return tabuladorConfig;
  // }
}
