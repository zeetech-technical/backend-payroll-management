import { User } from "../user/user.model";
import { Tenant } from "./tenant.model";

export class TenantService {
  async getTenants() {
    return await Tenant.findAll({include: [{ model: User, as: 'users' , attributes: ['id', 'name', 'email'] }]});
  }

  async getTenant(id: string) {
    return await Tenant.findByPk(id);
  }

  async createTenant(data: any) {
    return await Tenant.create(data);
  }

  async updateTenant(id: string, data: any) {
    const tenant = await Tenant.findByPk(id);
  }

  async deleteTenant(id: string) {
    const tenant = await Tenant.findByPk(id);
  }
}
