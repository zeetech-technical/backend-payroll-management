import { Permissions } from "./permissions.model";
import logger from "../../utils/logger";

export const seedPermissions = async () => {
  await Permissions.destroy({ where: {}, truncate: true });
  await Permissions.bulkCreate([
    { slug: "DASHBOARD:ADMINISTRATOR", name: "Dashboard administrator" },
    { slug: "DASHBOARD:WORKERS", name: "Dashboard workers" },
    { slug: "DASHBOARD:USERS", name: "Route User" },
    { slug: "DASHBOARD:CATALOGS", name: "Route catalogs" },
    { slug: "DASHBOARD:TABULADOR", name: "Route tabulador" },
    { slug: "DASHBOARD:POSITION", name: "Route position" },

    // USERS
    { slug: "USER:LIST", name: "List of users" },
    { slug: "USER:READ", name: "Read user" },
    { slug: "USER:CREATE", name: "Create user" },
    { slug: "USER:UPDATE", name: "Update user" },
    { slug: "USER:DELETE", name: "Delete user" },
    { slug: "USER:DESTROY", name: "Destroy user" },
    // ROLES
    { slug: "ROLE:LIST", name: "List of roles" },
    { slug: "ROLE:READ", name: "Read role" },
    { slug: "ROLE:CREATE", name: "Create role" },
    { slug: "ROLE:UPDATE", name: "Update role" },
    { slug: "ROLE:DELETE", name: "Delete role" },
    { slug: "ROLE:DESTROY", name: "Destroy role" },
    // PERMISSIONS
    { slug: "PERMISSION:LIST", name: "List of permissions" },
    { slug: "PERMISSION:READ", name: "Read permission" },
    { slug: "PERMISSION:CREATE", name: "Create permission" },
    { slug: "PERMISSION:UPDATE", name: "Update permission" },
    { slug: "PERMISSION:DELETE", name: "Delete permission" },
    { slug: "PERMISSION:DESTROY", name: "Destroy permission" },
    // AUTH
    { slug: "AUTH:LOGIN", name: "Login" },
    { slug: "AUTH:LOGOUT", name: "Logout" },
    { slug: "AUTH:REFRESH", name: "Refresh token" },
    { slug: "AUTH:ME", name: "Get current user" },
  ]);
  logger.info("[seed] permissions successfully");
};