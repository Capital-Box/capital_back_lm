import { User } from "modules/users/domain/entities/user.entity";
import { CreateUserDTO } from "../dtos/create_user.dto";
import { UserDTO } from "../dtos/user.dto";
import { PasswordFactory } from "./password.factory";
import { EmailFactory } from "./email.factory";
import { RoleFactory } from "./role.factory";
import { CityFactory } from "./city.factory";

export class UserFactory {
  static create(user: CreateUserDTO): User {
    return new User({
      username: user.username,
      password: PasswordFactory.create(user.password),
      email: EmailFactory.create(user.email),
      role: RoleFactory.create(user.role),
      city: CityFactory.create(user.city),
    });
  }
}
