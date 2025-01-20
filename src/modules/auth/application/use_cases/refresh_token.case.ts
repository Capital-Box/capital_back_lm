import { TokenDTO } from "../dtos/token.dto";

export interface RefreshTokenCase {
  refresh(refreshToken: string): Promise<TokenDTO>;
}