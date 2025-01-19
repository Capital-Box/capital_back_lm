import { APIGatewayProxyEvent } from "aws-lambda";
import { UserService } from "../application/services/user.service";
import { UpdateUserRequestDTO } from "../infrastructure/dtos/requests/update_user_request.dto";
import { UserApiGatewayAdapter } from "../infrastructure/adapters/user_apigateway.adapter";



const userService = new UserService();
const userApiGatewayAdapter = new UserApiGatewayAdapter({
  service: userService,
});

export const handle = async (req: APIGatewayProxyEvent) => {
  const requestDTO = new UpdateUserRequestDTO(req);
  const responseDTO = await userApiGatewayAdapter.updateUser(requestDTO);
  return responseDTO.send();
};