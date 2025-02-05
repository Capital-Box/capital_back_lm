import { Password } from 'modules/users/domain/value_objects/password.vo';
import { IHasheable } from '../interfaces/iHash.interface';

export class PasswordFactory {
  static async create(password: string, hashService: IHasheable): Promise<Password> {
    return await Password.create(password, { hashService });
  }
}
