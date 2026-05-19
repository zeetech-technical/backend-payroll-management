import { Permissions } from "./permissions.model";

export class PermissionsService {
  async getAllPermissions() {
    try {
      const permissions = await Permissions.findAll();
      return permissions;
    } catch (error) {
      throw error;
    }
  }

  async getPermissionById(id: number) {
    try {
      const permission = await Permissions.findByPk(id);
      return permission;
    } catch (error) {
      throw error;
    }
  }

  async createPermission(data: { slug: string; name: string }) {
    try {
      const permission = await Permissions.create(data);
      return permission;
    } catch (error) {
      throw error;
    }
  }

  async updatePermission(id: number, data: { slug: string; name: string }) {
    try {
      const permission = await Permissions.update(data, { where: { id } });
      return permission;
    } catch (error) {
      throw error;
    }
  }

  async deleteLogicalPermission(id: number) {
    try {
      const permission = await Permissions.update({ deletedAt: new Date() }, { where: { id, deletedAt: null } });
      return permission;
    } catch (error) {
      throw error;
    }
  }

  async deleteDestroyPermission(id: number) {
    try {
      const permission = await Permissions.destroy({ where: { id } });
      return permission;
    } catch (error) {
      throw error;
    }
  }
}
