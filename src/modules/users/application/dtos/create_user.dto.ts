import { UUID } from "@shared/value_objects/uuid.vo";

type ICreateUser = {
  name: string;
  password?: string;
  email?: string;
  role?: string;
  city?: string;
};

export class CreateUserDTO {
  public readonly name: string;
  public readonly password?: string;
  public readonly email?: string;
  public readonly role?: string;
  public readonly city?: string;

  constructor(user: ICreateUser) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
    this.role = user.role;
    this.city = user.city;
  }
}
