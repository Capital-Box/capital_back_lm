import { CreateUserDTO } from '../dtos/create_user.dto';
import { UserDTO } from '../dtos/user.dto';
import { CognitoAuthRepository } from '../../../auth/infrastructure/adapters/cognito_auth_repository.adapter';

export interface CreateUserCase {
  create(createUserDTO: CreateUserDTO): Promise<UserDTO>;
}
