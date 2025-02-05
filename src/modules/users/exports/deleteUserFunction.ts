import { APIGatewayProxyEvent, APIGatewayProxyEventV2 } from "aws-lambda";
import { UserService } from "../application/services/user.service";
import { DynamoDbUserRepository } from "../infrastructure/adapters/dynamodb_user_repository.adapter";
import { UserApiGatewayAdapter } from "../infrastructure/adapters/user_apigateway.adapter";
import { DeleteUserRequestDTO } from "../infrastructure/dtos/requests/delete_user_request.dto";
import { ArgonHashService } from "../application/services/argon.service";


export const handle = async (req: APIGatewayProxyEventV2) => {
  // 1. Instanciar el repositorio
  const userRepository = new DynamoDbUserRepository({
    tableName: process.env.USERS_TABLE_NAME!,
  });

  // 2. Crear el servicio
  const userService = new UserService(userRepository, new ArgonHashService());

  // 3. Adaptador de entrada
  const userAdapter = new UserApiGatewayAdapter({
    service: userService,
  });

  // 4. Crear RequestDTO y validarlo
  const requestDTO = new DeleteUserRequestDTO(req);
  requestDTO.validatePayload();

  // 5. Llamar el método deleteUser
  const responseDTO = await userAdapter.deleteUser(requestDTO);

  // 6. Retornar la respuesta
  return responseDTO.send();
};
