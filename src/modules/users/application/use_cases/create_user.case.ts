import { CreateUserDTO } from '../dtos/create_user.dto';
import { UserDTO } from '../dtos/user.dto';

export interface CreateUserCase {
  create(createUserDTO: CreateUserDTO): Promise<UserDTO>;
}
