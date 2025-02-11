import { CreateAuthUserDTO } from 'modules/users/application/dtos/auth_modules_dtos/create_auth_user.dto';
import { DeleteAuthUserDTO } from 'modules/users/application/dtos/auth_modules_dtos/delete_auth_user.dto';
import { UpdateAuthUserDTO } from 'modules/users/application/dtos/auth_modules_dtos/update_auth_user.dto';

export interface AuthUserPort {
  save(createAuthUser: CreateAuthUserDTO): Promise<void>;
  update(updateAuthUser: UpdateAuthUserDTO): Promise<void>;
  delete(deleteAuthUser: DeleteAuthUserDTO): Promise<void>;
}
