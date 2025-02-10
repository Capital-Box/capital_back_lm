import { APIGatewayProxyEventV2 } from "aws-lambda";
import { AuthService } from "../application/services/auth.service";
import { CognitoAuthRepository } from "../infrastructure/adapters/cognito_auth_repository.adapter";
import {
  LogOutRequestDTO
} from "../infrastructure/dtos/request/logout_request.dto";
import { LogOutResponseDTO } from "../infrastructure/dtos/response/logout_response.dto";

export const handle = async (event: APIGatewayProxyEventV2) => {
  const authRepository = new CognitoAuthRepository({
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
  });

  const authService = new AuthService(authRepository);

  // Construir el request DTO
  const requestDTO = new LogOutRequestDTO(event);
  requestDTO.validatePayload();

  // Llamar la capa de aplicación
  const newTokens = await authService.logout(requestDTO.refresh_token);

  // Construir la response
  const responseDTO = new LogOutResponseDTO();
  return responseDTO.send();
};
