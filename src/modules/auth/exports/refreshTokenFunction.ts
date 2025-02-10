import { APIGatewayProxyEventV2 } from "aws-lambda";
import { TokenDTO } from "../application/dtos/token.dto";
import { AuthService } from "../application/services/auth.service";
import { CognitoAuthRepository } from "../infrastructure/adapters/cognito_auth_repository.adapter";
import { RefreshTokenRequestDTO } from "../infrastructure/dtos/request/refresh_token_request.dto";
import { RefreshTokenResponseDTO } from "../infrastructure/dtos/response/refresh_token.response.dto";


export const handle = async (event: APIGatewayProxyEventV2) => {
  const authRepository = new CognitoAuthRepository({
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
  });

  const authService = new AuthService(authRepository);

  // Construir el request DTO
  const requestDTO = new RefreshTokenRequestDTO(event);
  requestDTO.validatePayload();

  // Llamar la capa de aplicación
  const newTokens: TokenDTO = await authService.refresh(requestDTO.refreshToken);

  // Construir la response
  const responseDTO = new RefreshTokenResponseDTO({
    access_token: newTokens.access_token,
    refresh_token: newTokens.refresh_token,
  });
  return responseDTO.send();
};
