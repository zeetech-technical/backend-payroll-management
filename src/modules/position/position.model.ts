import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/sequelize";
import { Tabulador } from "../tabulador/tabulador.model";

export class Position extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
}

Position.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tabuladorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tabulador,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "positions",
    timestamps: true,
    deletedAt: "deletedAt",
    paranoid: true,
  },
);

Position.belongsTo(Tabulador, { foreignKey: "tabuladorId", as: "tabulador" });
