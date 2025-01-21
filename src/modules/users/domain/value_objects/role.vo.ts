import { Roles } from "../enums/roles.enum";

export class Role {
  private _role: Roles;

  constructor(role: Roles) {
    this._role = role;
  }

  getRole(): Roles {
    return this._role;
  }

  static isValid(role: string): role is Roles {
    return Object.values(Roles).includes(role as Roles);
  }
}
