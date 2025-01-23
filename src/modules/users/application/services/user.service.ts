import { UserDTO } from '../dtos/user.dto';
import { CreateUserCase } from '../use_cases/create_user.case';
import { UpdateUserCase } from '../use_cases/update_user.case';

export class UserService implements CreateUserCase, UpdateUserCase {
  create(): Promise<UserDTO> {
    throw new Error('Method not implemented.');
  }

  update(): Promise<UserDTO> {
    throw new Error('Method not implemented.');
  }
}
