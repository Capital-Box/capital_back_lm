import { ApiGatewayRequestDTO } from "@lib/infrastructure/dtos/requests/apigateway_request.dto";
import { ICreatePayload } from "@lib/infrastructure/dtos/requests/request.dto";

interface IRegisterUserAttributes {
  username: string;
  password: string;
  email: string;
  role: string;
  city: string;
}

export class RegisterUserRequestDTO extends ApiGatewayRequestDTO<IRegisterUserAttributes> {
  validatePayload(): void {
    throw new Error("Method not implemented.");
  }

  getPayload(): ICreatePayload<IRegisterUserAttributes> {
    return super.getPayload() as ICreatePayload<IRegisterUserAttributes>;
  }
}
