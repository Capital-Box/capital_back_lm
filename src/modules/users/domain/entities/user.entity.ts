import { Entity } from "@lib/domain/entity";
import { Cities } from "../enums/cities.enum";
import { Roles } from "../enums/roles.enum";
import { City } from "../value_objects/city.vo";
import { Email } from "../value_objects/email.vo";
import { Password } from "../value_objects/password.vo";
import { Role } from "../value_objects/role.vo";
import { UUID } from "@shared/value_objects/uuid.vo";

type IUser = {
  id: UUID;
  username: string;
  password: Password;
  email: Email;
  role: Role;
  city: City;
  createdDate: Date;
  lastUpdated: Date;
};
export class User extends Entity {
  private _id: UUID;
  private _username: string;
  private _password: Password;
  private _email: Email;
  private _role: Role;
  private _city: City;
  private _createdDate: Date
  private _lastUpdated: Date;

  constructor(user: IUser) {
    super();
    this._id = user.id;
    this._username = user.username;
    this._password = user.password;
    this._email = user.email;
    this._role = user.role;
    this._city = user.city;
    this._createdDate = user.createdDate;
    this._lastUpdated = user.lastUpdated;
  }

  getId(): string {
    return this._id.getUUID();
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

  getCreatedDate(): Date {
    return this._createdDate;
  }

  getLastUpdated(): Date {
    return this._lastUpdated;
  }

  newDateISOString(): string {
    return new Date().toISOString();
  }
}
