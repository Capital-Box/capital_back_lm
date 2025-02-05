import { Entity } from "@lib/domain/entity";
import { Cities } from "../enums/cities.enum";
import { Roles } from "../enums/roles.enum";
import { City } from "../value_objects/city.vo";
import { Email } from "../value_objects/email.vo";
import { Password } from "../value_objects/password.vo";
import { Role } from "../value_objects/role.vo";
import { UUID } from "@shared/value_objects/uuid.vo";
import { IHasheable } from "modules/users/application/interfaces/iHash.interface";

type IUser = {
  id: UUID;
  name: string;
  password: Password;
  email: Email;
  role: Role;
  city: City;
  createdDate: Date;
  lastUpdated: Date;
};
export class User extends Entity {
  private _id: UUID;
  private _name: string;
  private _password: Password;
  private _email: Email;
  private _role: Role;
  private _city: City;
  private _createdDate: Date
  private _lastUpdated: Date;

  constructor(user: IUser) {
    super();
    this._id = user.id;
    this._name = user.name;
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

  getName(): string {
    return this._name;
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

  setName(name: string): void {
    this._name = name;
  }

  async setPassword(password: string, hashService: IHasheable): Promise<void> {
    this._password = await Password.create(password, { hashService });
  }

  setEmail(email: string): void {
    this._email = new Email(email);
  }

  setRole(role: string): void {
    if (!Role.isValid(role)) {
      throw new Error(`Invalid role: ${role}`);
    }
    this._role = new Role(role);
  }

  setCity(city: string): void {
    if (!City.isValid(city)) {
      throw new Error(`Invalid city: ${city}`);
    }
    this._city = new City(city);
  }

  setLastUpdated(): void {
    this._lastUpdated = new Date();
  }
  
}
