import { User } from 'modules/users/domain/entities/user.entity';
import { UserDTO } from '../dtos/user.dto';
import { UUID } from '@shared/value_objects/uuid.vo';
import { Password } from 'modules/users/domain/value_objects/password.vo';
import { IHasheable } from '../interfaces/iHash.interface';
import { Role } from 'modules/users/domain/value_objects/role.vo';
import { City } from 'modules/users/domain/value_objects/city.vo';
import { Email } from 'modules/users/domain/value_objects/email.vo';

export class UserMapper {
  static toDTO(user: User): UserDTO {
    return new UserDTO({
      id: user.getId(),
      name: user.getName(),
      password: user.getPassword(),
      email: user.getEmail(),
      role: user.getRole(),
      city: user.getCity(),
      createdDate: user.getCreatedDate(),
      lastUpdated: user.getLastUpdated(),
    });
  }

  static toEntity(userDTO: UserDTO, hashService: IHasheable): User {
    return new User({
      id: new UUID(userDTO.id),
      name: userDTO.name,
      password: new Password(userDTO.password, { hashService }),
      email: new Email(userDTO.email),
      role: new Role(userDTO.role),
      city: new City(userDTO.city),
      createdDate: userDTO.createdDate,
      lastUpdated: userDTO.lastUpdated,
    });
  }
}
