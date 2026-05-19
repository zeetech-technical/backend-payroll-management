import { randomBytes } from "node:crypto";
import logger from "../../utils/logger";
import { User, UserRoles } from "./user.model";
import { Roles } from "../roles/roles.model";
const gpwd = randomBytes(8).toString("hex");

export const seedUsers = async () => {
  await User.destroy({ where: {}, truncate: true });

  const roles = await Roles.findAll({ where: {}, raw: true });
  await User.bulkCreate(
    [
      {
        p_surname: "Perez",
        m_surname: "Perez",
        name: "Juan",
        email: "admin@test.com",
        password: gpwd,
      },
      {
        p_surname: "Garcia",
        m_surname: "Garcia",
        name: "Luis",
        email: "user@test.com",
        password: gpwd,
      },
    ],
    { individualHooks: true },
  );

  const users = await User.findAll({ where: {}, raw: true });
  const roleMap = Object.fromEntries(roles.map((r) => [r.name, r.id]));
  const userMap = Object.fromEntries(users.map((u) => [u.email, u.id]));

  await UserRoles.bulkCreate([
    {
      user_id: userMap["admin@test.com"],
      role_id: roleMap["admin"],
    },
    {
      user_id: userMap["user@test.com"],
      role_id: roleMap["user"],
    },
  ]);
  logger.info(`[seed] users successfully [pwd] for users: ${gpwd}`);
};
