import { APIGatewayProxyEvent } from "aws-lambda";
import { UserService } from "../application/services/user.service";
import { CognitoUserRepository } from "../infrastructure/adapters/cognito_user_repository.adapter";
import { UserApiGatewayAdapter } from "../infrastructure/adapters/user_apigateway.adapter";
import { DeleteUserRequestDTO } from "../infrastructure/dtos/requests/delete_user_request.dto";


export const handle = async (event: APIGatewayProxyEvent) => {
  // 1. Instanciar el repositorio
  const userRepository = new CognitoUserRepository({
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
  });

  // 2. Crear el servicio
  const userService = new UserService(userRepository);

  // 3. Adaptador de entrada
  const userAdapter = new UserApiGatewayAdapter({
    service: userService,
  });

  // 4. Crear RequestDTO y validarlo
  const requestDTO = new DeleteUserRequestDTO(event);
  requestDTO.validatePayload();

  // 5. Llamar el método deleteUser
  const responseDTO = await userAdapter.deleteUser(requestDTO.userId);

  // 6. Retornar la respuesta
  return responseDTO.send();
};
