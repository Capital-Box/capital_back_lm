import { ApiGatewayRequestDTO } from "@lib/infrastructure/dtos/requests/apigateway_request.dto";
import { ICreatePayload } from "@lib/infrastructure/dtos/requests/request.dto";

interface IUpdateUserAttributes {
  id: string;
  username: string;
  password?: string;
  email?: string;
  role?: string;
  city?: string;
}

export class UpdateUserRequestDTO extends ApiGatewayRequestDTO<IUpdateUserAttributes> {
  validatePayload(): void {
    const { username } = this.getPayload().attributes;
    if(!username) {
      throw new Error("Username is required");
    }
  }

  getPayload(): ICreatePayload<IUpdateUserAttributes> {
    return super.getPayload() as ICreatePayload<IUpdateUserAttributes>;
  }
}
