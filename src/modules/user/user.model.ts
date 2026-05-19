import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/sequelize";
import { hashChain } from "../../utils/bycript";
import { Roles } from "../roles/roles.model";
import { Permissions } from "../permissions/permissions.model";
export class User extends Model {
  declare id: number;
  declare password: string;
  declare email: string;
  declare name: string;
  declare p_surname: string;
  declare m_surname: string;
  declare roles?: Roles[];
  declare permissions?: Permissions[];
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    p_surname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    m_surname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
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
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    fullname: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} ${this.p_surname} ${this.m_surname}`;
      },
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    deletedAt: "deletedAt",
    paranoid: true,
    hooks: {
      beforeCreate: async (user: User) => {
        user.password = await hashChain(user.password);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed("password")) {
          user.password = await hashChain(user.password);
        }
      },
    },
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
  },
);
// User.belongsTo(Tenant, { foreignKey: "tenantId", as: "tenant" });
// Tenant.hasMany(User, { foreignKey: "tenantId", as: "users" });

export const UserRoles = sequelize.define(
  "user_roles",
  {},
  {
    indexes: [
      {
        unique: true,
        fields: ["user_id", "role_id"],
      },
    ],
  },
);
export const UserPermissions = sequelize.define(
  "user_permissions",
  {},
  {
    indexes: [
      {
        unique: true,
        fields: ["user_id", "permission_id"],
      },
    ],
  },
);
export const RolePermissions = sequelize.define(
  "role_permissions",
  {},
  {
    indexes: [
      {
        unique: true,
        fields: ["role_id", "permission_id"],
      },
    ],
  },
);

User.belongsToMany(Roles, {
  through: UserRoles,
  foreignKey: "user_id",
  otherKey: "role_id",
  as: "roles",
});
Roles.belongsToMany(User, {
  through: UserRoles,
  foreignKey: "role_id",
  otherKey: "user_id",
  as: "users",
});

User.belongsToMany(Permissions, {
  through: UserPermissions,
  foreignKey: "user_id",
  otherKey: "permission_id",
  as: "permissions",
});

Permissions.belongsToMany(User, {
  through: UserPermissions,
  foreignKey: "permission_id",
  otherKey: "user_id",
  as: "users",
});

Roles.belongsToMany(Permissions, {
  through: RolePermissions,
  foreignKey: "role_id",
  otherKey: "permission_id",
  as: "permissions",
});
Permissions.belongsToMany(Roles, {
  through: RolePermissions,
  foreignKey: "permission_id",
  otherKey: "role_id",
  as: "roles",
});

