import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/sequelize";

export class Permissions extends Model {
  declare id: number;
  declare slug: string;
  declare name: string;
}

Permissions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: false,
      },
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: false,
      },
    },
  },
  {
    sequelize,
    tableName: "permissions",
    timestamps: true,
    deletedAt: "deletedAt",
    paranoid: true,
  },
);


