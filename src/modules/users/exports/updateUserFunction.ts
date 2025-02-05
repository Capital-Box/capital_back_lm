import { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserService } from "../application/services/user.service";
import { UserApiGatewayAdapter } from "../infrastructure/adapters/user_apigateway.adapter";
import { UpdateUserRequestDTO } from "../infrastructure/dtos/requests/update_user_request.dto";
import { DynamoDbUserRepository } from "../infrastructure/adapters/dynamodb_user_repository.adapter";
import { ArgonHashService } from "../application/services/argon.service";

export const handle = async (req: APIGatewayProxyEventV2) => {
  // 1. Instancia el repositorio de usuarios
  const userRepository = new DynamoDbUserRepository({
    tableName: process.env.USERS_TABLE_NAME!,
  });

  // 2. Instancia el servicio
  const userService = new UserService(userRepository, new ArgonHashService());

  // 3. Instancia el adaptador de entrada
  const userAdapter = new UserApiGatewayAdapter({
    service: userService,
  });

  // 4. Construye el DTO de request
  const requestDTO = new UpdateUserRequestDTO(req);

  // 5. Ejecuta el caso de uso y obtén la respuesta
  const responseDTO = await userAdapter.updateUser(requestDTO);

  // 6. Retorna la respuesta en formato API Gateway
  return responseDTO.send();
};
