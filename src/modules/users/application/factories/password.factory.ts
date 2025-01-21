import { Password } from "modules/users/domain/value_objects/password.vo";

export class PasswordFactory {
  static create(password: string): Password {
    if (!Password.isValid(password)) throw new Error("Not Valid Password");
    return new Password(password);
  }
}
