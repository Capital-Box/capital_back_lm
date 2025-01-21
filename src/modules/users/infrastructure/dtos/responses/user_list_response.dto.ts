import { ApiGatewayResponseDTO } from "@lib/infrastructure/dtos/responses/apigateway_response.dto";
import { HttpStatus } from "@lib/infrastructure/enums/http_status.enum";
import { UserDTO } from "modules/users/application/dtos/user.dto";

interface IUserListAttributes {
  id: string;
  name: string;
  email: string;
  role: string;
  city: string;
}

export class UserListResponseDTO extends ApiGatewayResponseDTO<IUserListAttributes> {
  constructor(users: UserDTO[]) {
    super({
      status: HttpStatus.OK,
      payload: users.map((user) => ({
        id: user.getUsername(),
        type: "user",
        attributes: {
          name: user.getUsername(),
          email: user.getEmail(),
          role: user.getRole(),
          city: user.getCity(),
        },
      })),
    });
  }
}
