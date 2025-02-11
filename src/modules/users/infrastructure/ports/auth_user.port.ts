import { CreateAuthUserDTO } from 'modules/users/application/dtos/create_auth_user.dto';

export interface AuthUserPort {
  save(createAuthUser: CreateAuthUserDTO): Promise<void>;
}
