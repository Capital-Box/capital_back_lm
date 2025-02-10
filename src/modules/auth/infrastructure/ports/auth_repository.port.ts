import { TokenDTO } from "modules/auth/application/dtos/token.dto";
import { User } from "modules/users/domain/entities/user.entity";

export interface AuthRepositoryPort {
  save(user: User): Promise<void>;
  authenticate(username: string, password: string): Promise<TokenDTO>;
  refresh(refreshToken: string): Promise<TokenDTO>;
  logout(refreshToken: string): Promise<void>;
}
