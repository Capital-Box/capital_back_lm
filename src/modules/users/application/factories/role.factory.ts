import { Roles } from "modules/users/domain/enums/roles.enum";
import { Role } from "modules/users/domain/value_objects/role.vo";

export class RoleFactory {
  static create(role: Roles | string): Role {
    if (!Role.isValid(role)) throw new Error("Is not valid role");
    return new Role(role);
  }
}
