import { LoginUserDTO } from "modules/auth/application/dtos/login_user.dto";
import { LoginUserCase } from "modules/auth/application/use_cases/login_user.case";
import { RefreshTokenCase } from "modules/auth/application/use_cases/refresh_token.case";
import { LoginRequestDTO } from "../dtos/request/login_request.dto";
import { RefreshTokenRequestDTO } from "../dtos/request/refresh_token_request.dto";
import { LoginResponseDTO } from "../dtos/response/login_response.dto";
import { RefreshTokenResponseDTO } from "../dtos/response/refresh_token.response.dto";
import { LoginUserPort } from "../ports/login_user.port";
import { RefreshTokenPort } from "../ports/refresh_token.port";
import { LogoutPort } from "../ports/logout_user.port";
import { LogoutCase } from "modules/auth/application/use_cases/logout_user.case";
import { LogOutResponseDTO } from "../dtos/response/logout_response.dto";
import { LogOutRequestDTO } from "../dtos/request/logout_request.dto";

interface AuthApiGatewayAdapterDependencies {
  service: LoginUserCase & RefreshTokenCase & LogoutCase;
}

export class AuthApiGatewayAdapter
  implements LoginUserPort, RefreshTokenPort, LogoutPort
{
  constructor(
    private readonly dependencies: AuthApiGatewayAdapterDependencies
  ) {}

  async loginUser(req: LoginRequestDTO): Promise<LoginResponseDTO> {
    req.validatePayload();
    const loginUserDTO = new LoginUserDTO({
      username: req.username,
      password: req.password,
    });
    const tokenDTO = await this.dependencies.service.login(loginUserDTO);

    return new LoginResponseDTO(tokenDTO);
  }

  async refreshToken(
    req: RefreshTokenRequestDTO
  ): Promise<RefreshTokenResponseDTO> {
    req.validatePayload();
    const tokenDTO = await this.dependencies.service.refresh(
      req.getData().attributes.refreshToken
    );
    return new RefreshTokenResponseDTO(tokenDTO);
  }

  async logout(req: LogOutRequestDTO): Promise<LogOutResponseDTO> {
    req.validatePayload();
    await this.dependencies.service.logout(
      req.getData().attributes.refresh_token
    );
    const response = new LogOutResponseDTO();
    return response;
  }
}
