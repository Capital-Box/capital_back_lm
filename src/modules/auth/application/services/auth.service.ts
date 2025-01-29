import { LoginUserCase } from "../use_cases/login_user.case";
import { RefreshTokenCase } from "../use_cases/refresh_token.case";
import { LoginUserDTO } from "../dtos/login_user.dto";
import { TokenDTO } from "../dtos/token.dto";
import { AuthRepositoryPort } from "../../infrastructure/ports/auth_repository.port";
import { LogoutCase } from "../use_cases/logout_user.case";

export class AuthService implements LoginUserCase, RefreshTokenCase, LogoutCase {
  constructor(private readonly authRepository: AuthRepositoryPort) {}

  async login(loginUserDTO: LoginUserDTO): Promise<TokenDTO> {
    const tokenDTO = await this.authRepository.authenticate(
      loginUserDTO.username,
      loginUserDTO.password
    );
    return tokenDTO;
  }

  async refresh(refreshToken: string): Promise<TokenDTO> {
    const tokenDTO = await this.authRepository.refresh(refreshToken);
    return tokenDTO;
  }

  async logout(refreshToken: string): Promise<void> {
    await this.authRepository.logout(refreshToken);
  }
}