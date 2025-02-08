import { Entity } from '@lib/domain/entity';
import { Cities } from '../enums/cities.enum';
import { Roles } from '../enums/roles.enum';
import { City } from '../value_objects/city.vo';
import { Email } from '../value_objects/email.vo';
import { Password } from '../value_objects/password.vo';
import { Role } from '../value_objects/role.vo';

type IUser = {
  username: string;
  password: Password;
  email: Email;
  role: Role;
  city: City;
};

export class User extends Entity {
  private _username: string;
  private _password: Password;
  private _email: Email;
  private _role: Role;
  private _city: City;

  constructor(user: IUser) {
    super();
    this._username = user.username;
    this._password = user.password;
    this._email = user.email;
    this._role = user.role;
    this._city = user.city;
  }

  getUserName(): string {
    return this._username;
  }

  getPassword(): string {
    return this._password.getPassword();
  }

  getEmail() {
    return this._email.getEmail();
  }

  getRole(): Roles {
    return this._role.getRole();
  }

  getCity(): Cities {
    return this._city.getCity();
  }
}
