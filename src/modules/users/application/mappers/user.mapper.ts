import { User } from "modules/users/domain/entities/user.entity";
import { UserDTO } from "../dtos/user.dto";

export class UserMapper {

  static toDTO(user: User): UserDTO {
    return new UserDTO({
      id: user.getId(),
      name: user.getName(),
      password: user.getPassword(),
      email: user.getEmail(),
      role: user.getRole(),
      city: user.getCity(),
    });
  }
}