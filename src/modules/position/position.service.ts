import { Op } from "sequelize";
import { Catalog, TypeCatalog } from "../catalogs/catalog.model";
import { Tabulador, TabuladorConfig } from "../tabulador/tabulador.model";
import { Position } from "./position.model";
import { User } from "../user/user.model";

export class PositionService {
  async getAllPositions() {
    try {
      const positions = await Position.findAll({
        paranoid: false,
        order: [["id", "ASC"]],
      });
      return positions;
    } catch (error) {
      throw error;
    }
  }
  async createPosition(data: any) {
    try {
      const position = await Position.create(data);
      return position;
    } catch (error) {
      throw error;
    }
  }

  async deletePosition(id: number) {
    try {
      await Position.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async restorePosition(id: number) {
    try {
      await Position.restore({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async assignTabToPosition(data: any) {
    try {
      const { positionId, tabuladorId } = data;
      const position = await Position.findOne({ where: { id: positionId } });
      if (!position) {
        throw new Error("Position not found");
      }
      position.tabuladorId = tabuladorId;
      await position.save();
      const updatedTabulador = await Tabulador.findOne({
        where: { id: tabuladorId },
        include: [
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
        ],
        order: [
          [{ model: TabuladorConfig, as: "tabuladorConfig" }, "id", "ASC"],
        ],
      });

      return updatedTabulador;
    } catch (error) {
      throw error;
    }
  }

  async selectPositionToTab() {
    try {
      const positions = await Position.findAll({
        order: [["id", "ASC"]],
        where: {
          tabuladorId: null,
        },
      });
      return positions;
    } catch (error) {
      throw error;
    }
  }

  async getPositionsUserAvailable() {
    try {
      const positions = await Position.findAll({
        where: {
          tabuladorId: {
            [Op.ne]: null,
          },
        },
      });

      return positions;
    } catch (error) {
      throw error;
    }
  }
}
