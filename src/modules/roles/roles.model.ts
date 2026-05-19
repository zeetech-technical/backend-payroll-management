import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/sequelize";
import { Permissions } from "../permissions/permissions.model";

export class Roles extends Model {
  declare id: number;
  declare name: string;
  declare permissions?: Permissions[];
}

Roles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "roles",
    timestamps: true,
    deletedAt: "deletedAt",
    paranoid: true,
  },
);
