import { TokenDTO } from "modules/auth/application/dtos/token.dto";

export interface AuthRepositoryPort {
  authenticate(username: string, password: string): Promise<TokenDTO>;
  refresh(refreshToken: string): Promise<TokenDTO>;
}
