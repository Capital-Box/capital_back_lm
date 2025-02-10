import { UUID } from "@shared/value_objects/uuid.vo";
import { Cities } from "modules/users/domain/enums/cities.enum";
import { Roles } from "modules/users/domain/enums/roles.enum";

type IUser = {
  id: string;
  name: string;
  password: string;
  email: string;
  role: Roles;
  city: Cities;
};

export class UserDTO {
  private readonly id: string;
  private readonly name: string;
  private readonly password: string;
  private readonly email: string;
  private readonly role: Roles;
  private readonly city: Cities;

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
    this.role = user.role;
    this.city = user.city;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPassword(): string {
    return this.password;
  }

  getEmail(): string {
    return this.email;
  }

  getRole(): Roles {
    return this.role;
  }

  getCity(): Cities {
    return this.city;
  }

  toObject(): IUser {
    return {
      id: this.id,
      name: this.name,
      password: this.password,
      email: this.email,
      role: this.role,
      city: this.city,
    };
  }
}
