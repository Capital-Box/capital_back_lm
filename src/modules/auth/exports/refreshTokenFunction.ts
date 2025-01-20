// src/modules/auth/exports/refreshTokenFunction.ts
import { APIGatewayProxyEvent } from "aws-lambda";
import { AuthService } from "../../application/services/auth.service";
import { CognitoAuthRepository } from "../../infrastructure/adapters/cognito_auth_repository.adapter";
import { RefreshTokenRequestDTO } from "../../infrastructure/dtos/requests/refresh_token_request.dto"; // Define uno similar a LoginRequestDTO
import { RefreshTokenResponseDTO } from "../../infrastructure/dtos/responses/refresh_token_response.dto";
import { TokenDTO } from "../../application/dtos/token.dto";

export const handle = async (event: APIGatewayProxyEvent) => {
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
    accessToken: newTokens.accessToken,
    refreshToken: newTokens.refreshToken,
  });
  return responseDTO.send();
};
