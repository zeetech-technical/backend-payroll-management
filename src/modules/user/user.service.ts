import { Op } from "sequelize";
import { Permissions } from "../permissions/permissions.model";
import { Position } from "../position/position.model";
import { Roles } from "../roles/roles.model";
import { User, UserRoles } from "./user.model";
import { ITCreateUserBody } from "./user.schema";

export class UserService {
  constructor() {}

  public async getUsers(): Promise<User[]> {
    return User.findAll({
      where: { deletedAt: null },
      include: [
        {
          model: Position,
          as: "position",
          attributes: ["id", "name"],
        },
        {
          model: Roles,
          as: "roles",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
          // where: {
          //   name: "worker",
          // },
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
    try {
      const user = await User.create(createUserBody);
      await UserRoles.create({
        user_id: user.id,
        role_id: createUserBody.roleId,
      });
      await user.reload({
        include: [
          {
            model: Position,
            as: "position",
            attributes: ["id", "name"],
          },
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

      return user;
    } catch (error) {
      throw error;
    }
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
