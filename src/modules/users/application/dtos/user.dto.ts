import { UUID } from '@shared/value_objects/uuid.vo';
import { Cities } from 'modules/users/domain/enums/cities.enum';
import { Roles } from 'modules/users/domain/enums/roles.enum';

type IUser = {
  id: string;
  name: string;
  password: string;
  email: string;
  role: Roles;
  city: Cities;
  createdDate: Date;
  lastUpdated: Date;
};

export class UserDTO {
  public readonly id: string;
  public readonly name: string;
  public readonly password: string;
  public readonly email: string;
  public readonly role: Roles;
  public readonly city: Cities;
  public readonly createdDate: Date;
  public readonly lastUpdated: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
    this.role = user.role;
    this.city = user.city;
    this.createdDate = user.createdDate;
    this.lastUpdated = user.lastUpdated;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
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
}
