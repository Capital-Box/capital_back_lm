import { User } from 'modules/users/domain/entities/user.entity';
import { UserDTO } from '../dtos/user.dto';
import { Password } from 'modules/users/domain/value_objects/password.vo';
import { Email } from 'modules/users/domain/value_objects/email.vo';
import { Role } from 'modules/users/domain/value_objects/role.vo';
import { City } from 'modules/users/domain/value_objects/city.vo';
import { Roles } from 'modules/users/domain/enums/roles.enum';
import { Cities } from 'modules/users/domain/enums/cities.enum';

export class UserMapper {
  static toEntity(user: UserDTO): User {
    return new User({
      name: user.name,
      password: new Password(user.password),
      email: new Email(user.email),
      role: new Role(user.role as Roles),
      city: new City(user.city as Cities),
    });
  }

  static toDTO(user: User): UserDTO {
    return new UserDTO({
      name: user.getName(),
      password: user.getPassword(),
      email: user.getEmail(),
      role: user.getRole(),
      city: user.getCity(),
    });
  }
}
