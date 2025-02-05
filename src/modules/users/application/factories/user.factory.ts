import { UUID } from "@shared/value_objects/uuid.vo";
import { User } from "modules/users/domain/entities/user.entity";
import { CreateUserDTO } from "../dtos/create_user.dto";
import { IHasheable } from "../interfaces/iHash.interface";
import { CityFactory } from "./city.factory";
import { EmailFactory } from "./email.factory";
import { PasswordFactory } from "./password.factory";
import { RoleFactory } from "./role.factory";

export class UserFactory {
  static async create(user: CreateUserDTO, hashService: IHasheable): Promise<User> {
    const id = UUID.create();
    const now = new Date();
    
    return new User({
      id: id,
      name: user.name,
      password: await PasswordFactory.create(user.password, hashService),
      email: EmailFactory.create(user.email),
      role: RoleFactory.create(user.role),
      city: CityFactory.create(user.city),
      createdDate: now,
      lastUpdated: now
    });
  }
}
