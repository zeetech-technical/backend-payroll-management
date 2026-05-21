import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/sequelize";
import { Catalog } from "../catalogs/catalog.model";

export class Tabulador extends Model {
  declare id: number;
}

Tabulador.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    tableName: "tabulador",
    timestamps: false,
  },
);

export class TabuladorConfig extends Model {
  declare id: number;
  declare tabuladorId: number;
  declare catalogId: number;
  declare monto: number;
  declare porcentaje: number;
}

TabuladorConfig.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tabuladorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tabulador,
        key: "id",
      },
    },
    catalogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Catalog,
        key: "id",
      },
    },
    monto: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      get() {
        const value = this.getDataValue("monto");
        return value === null ? null : parseFloat(value);
      },
    },
    porcentaje: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      get() {
        const value = this.getDataValue("porcentaje");
        return value === null ? null : parseFloat(value);
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["tabuladorId", "catalogId"],
      },
    ],
    sequelize,
    tableName: "tabulador_config",
    timestamps: true,
    deletedAt: "deletedAt",
    paranoid: true,
  },
);

Tabulador.hasMany(TabuladorConfig, {
  foreignKey: "tabuladorId",
  as: "tabuladorConfig",
});

TabuladorConfig.belongsTo(Tabulador, {
  foreignKey: "tabuladorId",
  as: "tabulador",
});

Catalog.hasMany(TabuladorConfig, {
  foreignKey: "catalogId",
  as: "tabuladorConfig",
});

TabuladorConfig.belongsTo(Catalog, { foreignKey: "catalogId", as: "catalog" });
