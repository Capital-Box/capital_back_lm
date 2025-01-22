import { APIGatewayProxyEvent } from "aws-lambda";
import { UserService } from "../application/services/user.service";
import { UserApiGatewayAdapter } from "../infrastructure/adapters/user_apigateway.adapter";
import { RegisterUserRequestDTO } from "../infrastructure/dtos/requests/register_user_request.dto";
import { DynamoDbUserRepository } from "../infrastructure/adapters/dynamodb_user_repository.adapter";

// Modificar esta
export const handle = async (req: APIGatewayProxyEvent) => {
  const userRepository = new DynamoDbUserRepository({
    tableName: process.env.USERS_TABLE_NAME!,
  });

  // 2. Crear el servicio
  const userService = new UserService(userRepository);

  // 3. Instancia el adaptador de entrada
  const userAdapter = new UserApiGatewayAdapter({
    service: userService,
  });

  // 4. Construye el DTO de request
  const requestDTO = new RegisterUserRequestDTO(req);

  // 5. Ejecuta el caso de uso y obtén la respuesta
  const responseDTO = await userAdapter.createUser(requestDTO);

  // 6. Retorna la respuesta en formato API Gateway
  return responseDTO.send();
};
