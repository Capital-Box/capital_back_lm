import { APIGatewayProxyEventBase, APIGatewayProxyResultV2 } from "aws-lambda";
import { LoginUserUseCase } from "./application/use_cases/login_user.use_case";
import { LoginApiGatewayAdapter } from "./infrastructure/adapters/user_apigateway/apigateway_login.adapter";
import { CognitoLoginAdapter } from "./infrastructure/adapters/cognito_adapter/cognito_login.adapter";
import { RegisterUserUseCase } from "./application/use_cases/register_user.use_case";
import { RegisterApiGatewayAdapter } from "./infrastructure/adapters/user_apigateway/apigateway_register.adapter";
import { CognitoRegisterAdapter } from "./infrastructure/adapters/cognito_adapter/congito_register.adapter";
import { RefreshUserTokenUseCase } from "./application/use_cases/refresh_token_user.use_case";
import { CognitoRefreshTokenAdapter } from "./infrastructure/adapters/cognito_adapter/cognito_refresh_token";
import { RefreshTokenApiGatewayAdapter } from "./infrastructure/adapters/user_apigateway/apigateway_refresh_token";

export const login = async (
  event: APIGatewayProxyEventBase<{ user_id?: string }>
): Promise<APIGatewayProxyResultV2> => {
  const adapter = new LoginApiGatewayAdapter(
    new LoginUserUseCase(
      new CognitoLoginAdapter(
        process.env.COGNITO_USER_POOL_ID!,
        process.env.COGNITO_CLIENT_ID!
      )
    )
  );
  return await adapter.handle(event);
};

export const register = async (
  event: APIGatewayProxyEventBase<{ user_id?: string }>
): Promise<APIGatewayProxyResultV2> => {
  const userPoolId = process.env.COGNITO_USER_POOL_ID;
  const clientId = process.env.COGNITO_CLIENT_ID;

  if (!userPoolId || !clientId) {
    throw new Error(
      "Handler Error - COGNITO_USER_POOL_ID or COGNITO_CLIENT_ID is not set"
    );
  }

  const adapter = new RegisterApiGatewayAdapter(
    new RegisterUserUseCase(new CognitoRegisterAdapter(userPoolId, clientId))
  );

  return await adapter.handle(event);
};

export const refreshToken = async (
  event: APIGatewayProxyEventBase<{ user_id?: string }>
): Promise<APIGatewayProxyResultV2> => {
  const adapter = new RefreshTokenApiGatewayAdapter(
    new RefreshUserTokenUseCase(
      new CognitoRefreshTokenAdapter(
        process.env.COGNITO_USER_POOL_ID!,
        process.env.COGNITO_CLIENT_ID!
      )
    )
  );
  return adapter.handle(event);
};
