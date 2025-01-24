import { User } from "modules/users/domain/entities/user.entity";
import { UserDTO } from "../dtos/user.dto";
import { Password } from "modules/users/domain/value_objects/password.vo";
import { Email } from "modules/users/domain/value_objects/email.vo";
import { Role } from "modules/users/domain/value_objects/role.vo";
import { City } from "modules/users/domain/value_objects/city.vo";
import { UUID } from "@shared/value_objects/uuid.vo";

export class UserMapper {
  static toEntity(user: UserDTO): User {
    return new User({
      id: new UUID(user.getUsername()),
      username: user.getUsername(),
      password: new Password(user.getPassword()),
      email: new Email(user.getEmail()),
      role: new Role(user.getRole()),
      city: new City(user.getCity()),
      createdDate: new Date(),
      lastUpdated: new Date(),
    });
  }

  static toDTO(user: User): UserDTO {
    return new UserDTO({
      username: user.getUserName(),
      password: user.getPassword(),
      email: user.getEmail(),
      role: user.getRole(),
      city: user.getCity(),
    });
  }
}

