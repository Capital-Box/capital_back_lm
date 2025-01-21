import { APIGatewayProxyEvent } from "aws-lambda";
import { UserService } from "../application/services/user.service";
import { CognitoUserRepository } from "../infrastructure/adapters/cognito_user_repository.adapter";
import { UserApiGatewayAdapter } from "../infrastructure/adapters/user_apigateway.adapter";
import { UpdateUserRequestDTO } from "../infrastructure/dtos/requests/update_user_request.dto";

export const handle = async (event: APIGatewayProxyEvent) => {
  // 1. Instancia el repositorio de usuarios
  const userRepository = new CognitoUserRepository({
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
  });

  // 2. Instancia el servicio
  const userService = new UserService(userRepository);

  // 3. Instancia el adaptador de entrada
  const userAdapter = new UserApiGatewayAdapter({
    service: userService,
  });

  // 4. Construye el DTO de request
  const requestDTO = new UpdateUserRequestDTO(event);

  // 5. Ejecuta el caso de uso y obtén la respuesta
  const responseDTO = await userAdapter.updateUser(requestDTO);

  // 6. Retorna la respuesta en formato API Gateway
  return responseDTO.send();
};
