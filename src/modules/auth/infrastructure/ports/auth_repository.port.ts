import { TokenDTO } from 'modules/auth/application/dtos/token.dto';
import { CreateAuthDTO } from '../dtos/request/create_auth.dto';
import { UpdateAuthDTO } from '../dtos/request/update_auth.dto';
import { DeleteAuthDTO } from '../dtos/request/delete_auth.dto';

export interface AuthRepositoryPort {
  save(user: CreateAuthDTO): Promise<void>;
  update(user: UpdateAuthDTO): Promise<void>;
  delete(user: DeleteAuthDTO): Promise<void>;
  authenticate(username: string, password: string): Promise<TokenDTO>;
  refresh(refreshToken: string): Promise<TokenDTO>;
  logout(refreshToken: string): Promise<void>;
}
