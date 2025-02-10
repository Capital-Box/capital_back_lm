import { UUID } from '@shared/value_objects/uuid.vo';
import { User } from 'modules/users/domain/entities/user.entity';
import { CreateUserDTO } from '../dtos/create_user.dto';
import { IHasheable } from '../interfaces/iHash.interface';
import { CityFactory } from './city.factory';
import { EmailFactory } from './email.factory';
import { PasswordFactory } from './password.factory';
import { RoleFactory } from './role.factory';
import { UpdateUserDTO } from '../dtos/update_user.dto';
import { UserDTO } from 'modules/users/application/dtos/user.dto';
import { Email } from 'modules/users/domain/value_objects/email.vo';
import { City } from 'modules/users/domain/value_objects/city.vo';
import { Password } from 'modules/users/domain/value_objects/password.vo';
import { Role } from 'modules/users/domain/value_objects/role.vo';

export class UserFactory {
  static async create(
    user: CreateUserDTO,
    hashService: IHasheable,
  ): Promise<User> {
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
      lastUpdated: now,
    });
  }

  static async update(
    user: User,
    updateUser: UpdateUserDTO,
    hashService: IHasheable,
  ): Promise<User> {
    const now = new Date();
    return new User({
      id: new UUID(user.getId()),
      name: updateUser.name || user.getName(),
      password: await PasswordFactory.create(
        updateUser.password || user.getPassword(),
        hashService,
      ),
      email: EmailFactory.create(updateUser.email || user.getEmail()),
      role: RoleFactory.create(updateUser.role || user.getRole()),
      city: CityFactory.create(updateUser.city || user.getCity()),
      createdDate: user.getCreatedDate(),
      lastUpdated: now,
    });
  }

  static async load(userDTO: UserDTO, hashService: IHasheable): Promise<User> {
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
