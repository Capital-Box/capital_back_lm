import { User } from "modules/users/domain/entities/user.entity";
import { CreateUserDTO } from "../dtos/create_user.dto";
import { UserDTO } from "../dtos/user.dto";
import { PasswordFactory } from "./password.factory";
import { EmailFactory } from "./email.factory";
import { RoleFactory } from "./role.factory";
import { CityFactory } from "./city.factory";
import { UUID } from "@shared/value_objects/uuid.vo";
import { Roles } from "modules/users/domain/enums/roles.enum";
import { Cities } from "modules/users/domain/enums/cities.enum";

export class UserFactory {
  static create(user: CreateUserDTO): User {
    const id = UUID.create();
    const now = new Date();
    
    return new User({
      id: id,
      username: user.username,
      password: PasswordFactory.create(user.password || ''),
      email: EmailFactory.create(user.email || ''),
      role: RoleFactory.create(user.role || Roles.USER),
      city: CityFactory.create(user.city || Cities.CORDOBA),
      createdDate: now,
      lastUpdated: now
    });
  }
}
