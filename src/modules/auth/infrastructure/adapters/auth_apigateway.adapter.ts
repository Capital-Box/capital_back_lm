import { LoginUserDTO } from "modules/auth/application/dtos/login_user.dto";
import { LoginUserCase } from "modules/auth/application/use_cases/login_user.case";
import { RefreshTokenCase } from "modules/auth/application/use_cases/refresh_token.case";
import { LoginRequestDTO } from "../dtos/request/login_request.dto";
import { RefreshTokenRequestDTO } from "../dtos/request/refresh_token_request.dto";
import { LoginResponseDTO } from "../dtos/response/login_response.dto";
import { RefreshTokenResponseDTO } from "../dtos/response/refresh_token.response.dto";
import { LoginUserPort } from "../ports/login_user.port";

interface AuthApiGatewayAdapterDependencies {
  service: LoginUserCase & RefreshTokenCase
}

export class AuthApiGatewayAdapter implements LoginUserPort {
  constructor(
    private readonly dependencies: AuthApiGatewayAdapterDependencies
  ) {}

  async loginUser(req: LoginRequestDTO): Promise<LoginResponseDTO> {
    req.validatePayload();
    const loginUserDTO = new LoginUserDTO({
      username: req.username,
      password: req.getPayload().attributes.password,
    });
    const tokenDTO = await this.dependencies.service.login(loginUserDTO);

    return new LoginResponseDTO(tokenDTO);
  }

  async refreshToken(
    req: RefreshTokenRequestDTO
  ): Promise<RefreshTokenResponseDTO> {
    req.validatePayload();
    const tokenDTO = await this.dependencies.service.refresh(
      req.getPayload().attributes.refreshToken
    );
    return new RefreshTokenResponseDTO(tokenDTO);
  }

  async logoutUser(): Promise<void> {
    // Implementación de logout
  }
}

