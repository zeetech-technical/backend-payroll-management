import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/sequelize";
export class TypeCatalog extends Model {
  declare id: number;
  declare name: string;
}

TypeCatalog.init(
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
    factor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "type_catalogs",
    timestamps: true,
    deletedAt: "deletedAt",
    paranoid: true,
  },
);

export class Catalog extends Model {
  declare id: number;
  declare name: string;
  declare typeCatalogId: number;
}

Catalog.init(
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
    typeCatalogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TypeCatalog,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "catalogs",
    timestamps: true,
    deletedAt: "deletedAt",
    paranoid: true,
  },
);

TypeCatalog.hasMany(Catalog, { foreignKey: "typeCatalogId", as: "catalogs" });
Catalog.belongsTo(TypeCatalog, {
  foreignKey: "typeCatalogId",
  as: "typeCatalog",
});
