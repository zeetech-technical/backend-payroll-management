import { Permissions } from "../permissions/permissions.model";
import { Roles } from "./roles.model";
import { CreateRoleDto } from "./roles.schema";

export class RolesService {
  async getAllRoles() {
    try {
      const roles = await Roles.findAll({
        where: {
          deletedAt: null,
        },
        include: [
          {
            model: Permissions,
            as: "permissions",
            attributes: ["id", "name", "slug"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      return roles;
    } catch (error) {
      throw error;
    }
  }

  async getRoleById(id: number) {
    try {
      const role = await Roles.findByPk(id);
      return role;
    } catch (error) {
      throw error;
    }
  }

  async createRole(data: CreateRoleDto) {
    try {
      const role = await Roles.create(data);
      return role;
    } catch (error) {
      throw error;
    }
  }

  async updateRole(id: number, data: { name: string }) {
    try {
      const role = await Roles.update(data, { where: { id } });
      return role;
    } catch (error) {
      throw error;
    }
  }

  async deleteLogicalRole(id: number) {
    try {
      const role = await Roles.update(
        { deletedAt: new Date() },
        { where: { id, deletedAt: null } },
      );
      return role;
    } catch (error) {
      throw error;
    }
  }

  async deleteDestroyRole(id: number) {
    try {
      const role = await Roles.destroy({ where: { id } });
      return role;
    } catch (error) {
      throw error;
    }
  }
}
