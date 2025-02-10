// src/modules/auth/exports/loginFunction.ts
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { AuthService } from "../application/services/auth.service";
import { CognitoAuthRepository } from "../infrastructure/adapters/cognito_auth_repository.adapter";
import { LoginRequestDTO } from "../infrastructure/dtos/request/login_request.dto";
import { LoginResponseDTO } from "../infrastructure/dtos/response/login_response.dto";

export const handle = async (event: APIGatewayProxyEventV2) => {
  const authRepository = new CognitoAuthRepository({
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
  });

  const authService = new AuthService(authRepository);

  const requestDTO = new LoginRequestDTO(event);
  requestDTO.validatePayload();

  const validateUser = await authService.login(requestDTO);

  const ResponseDTO = new LoginResponseDTO({
    access_token: validateUser.access_token,
    refresh_token: validateUser.refresh_token,
  });

  return ResponseDTO.send();
};
