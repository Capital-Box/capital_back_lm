import { APIGatewayProxyEvent } from "aws-lambda";
import { UserService } from "../application/services/user.service";
import { UserApiGatewayAdapter } from "../infrastructure/adapters/user_apigateway.adapter";
import { RegisterUserRequestDTO } from "../infrastructure/dtos/requests/register_user_request.dto";

const userService = new UserService();
const userApiGatewayAdapter = new UserApiGatewayAdapter({
  service: userService,
});

export const handle = async (req: APIGatewayProxyEvent) => {
  const requestDTO = new RegisterUserRequestDTO(req);
  const responseDTO = await userApiGatewayAdapter.createUser(requestDTO);
  return responseDTO.send();
};
