import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/sequelize";

export class Tenant extends Model {}
Tenant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    tableName: "tenants",
    timestamps: true,
    deletedAt: "deletedAt",
    paranoid: true,
  },
);
