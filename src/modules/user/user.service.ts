import { Permissions } from "../permissions/permissions.model";
import { Roles } from "../roles/roles.model";
import { User, UserRoles } from "./user.model";
import { ITCreateUserBody } from "./user.schema";

export class UserService {
  constructor() {}

  public async getUsers(page: number, limit: number): Promise<User[]> {
    return User.findAll({
      where: { deletedAt: null },
      include: [ 
        {
          model: Roles,
          as: "roles",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
          include: [
            {
              model: Permissions,
              as: "permissions",
              attributes: ["id", "name", "slug"],
              through: { attributes: [] },
            },
          ],
        },
      {
        model: Permissions,
        as: "permissions",
        attributes: ["id", "name", "slug"],
        through: { attributes: [] },
      },
      ],
      limit,
      offset: (page - 1) * limit,
    })
  }

  public async getUser(id: number): Promise<User | null> {
    return User.findByPk(id, {
      include: [
        {
          model: Roles,
          as: "roles",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
          include: [
            {
              model: Permissions,
              as: "permissions",
              attributes: ["id", "name", "slug"],
              through: { attributes: [] },
            },
          ],
        },
      {
        model: Permissions,
        as: "permissions",
        attributes: ["id", "name", "slug"],
        through: { attributes: [] },
      },
      ],
    });
  }

  public async postUser(createUserBody: ITCreateUserBody): Promise<User> {
    return await User.create(createUserBody);
  }

  public async putUser(id: number, data: Partial<User>) {
    // return User.update(data, { where: { id } });
  }

  public async deleteUser(id: number): Promise<number> {
    const result = await User.update(
      { deletedAt: new Date() },
      { where: { id } },
    );
    return result[0];
  }
}
