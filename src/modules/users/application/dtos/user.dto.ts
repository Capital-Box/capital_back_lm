import { UUID } from "@shared/value_objects/uuid.vo";
import { Cities } from "modules/users/domain/enums/cities.enum";
import { Roles } from "modules/users/domain/enums/roles.enum";

type IUser = {
  id: UUID;
  username: string;
  password: string;
  email: string;
  role: Roles;
  city: Cities;
};

export class UserDTO {
  private readonly id: UUID;
  private readonly username: string;
  private readonly password: string;
  private readonly email: string;
  private readonly role: Roles;
  private readonly city: Cities;

  constructor(user: IUser) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.role = user.role;
    this.city = user.city;
  }

  getId(): string {
    return this.id.getUUID();
  }

  getUsername(): string {
    return this.username;
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
      username: this.username,
      password: this.password,
      email: this.email,
      role: this.role,
      city: this.city,
    };
  }
}
