import { Roles } from "./roles.model";
import logger from "../../utils/logger";
import { RolePermissions } from "../user/user.model";
import { Permissions } from "../permissions/permissions.model";

export const seedRoles = async () => {
  await Roles.destroy({ where: {}, truncate: true });
  await Roles.bulkCreate([
    { name: "admin", description: "Admin role" },
    { name: "worker", description: "Worker role" },
  ]);

  const permissions = await Permissions.findAll({ raw: true });
  const roles = await Roles.findAll({ raw: true });

  const mapRoles = Object.fromEntries(roles.map((r) => [r.name, r.id]));

  permissions.forEach(
    async (p) =>
      await RolePermissions.create({
        role_id: mapRoles["admin"],
        permission_id: p.id,
      }),
  );

  const permissionsWorker = permissions.filter((p) => p.slug.includes("DASHBOARD:WORKERS"));

  permissionsWorker.forEach(
    async (p) =>
      await RolePermissions.create({
        role_id: mapRoles["worker"],
        permission_id: p.id,
      }),
  );

  logger.info("[seed] roles successfully");
};
