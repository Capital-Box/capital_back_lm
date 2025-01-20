// src/modules/auth/exports/loginFunction.ts
import { APIGatewayProxyEvent } from "aws-lambda";
import { CognitoAuthRepository } from "../infrastructure/adapters/cognito_auth_repository.adapter";
import { AuthService } from "../application/services/auth.service";
import { AuthApiGatewayAdapter } from "../infrastructure/adapters/auth_apigateway.adapter";
import { LoginRequestDTO } from "../infrastructure/dtos/request/login_request.dto";


export const handle = async (event: APIGatewayProxyEvent) => {
  const authRepository = new CognitoAuthRepository({
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
  });

  const authService = new AuthService(authRepository);
  const authApiGatewayAdapter = new AuthApiGatewayAdapter(authService);

  const requestDTO = new LoginRequestDTO(event);
  const responseDTO = await authApiGatewayAdapter.login(requestDTO);

  return responseDTO.send();
};
