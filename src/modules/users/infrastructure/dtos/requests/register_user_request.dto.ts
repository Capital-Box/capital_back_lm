import { ApiGatewayRequestDTO } from '@lib/infrastructure/dtos/requests/apigateway_request.dto';
import { ICreatePayload } from '@lib/infrastructure/dtos/requests/request.dto';

interface IRegisterUserAttributes {
  email: string;
  password: string;
  name: string;
  city: string;
  role: string;
}

export class RegisterUserRequestDTO extends ApiGatewayRequestDTO<IRegisterUserAttributes> {
  validatePayload(): void {
    const payload = this.getPayload().data;
    console.log(payload);
    if (!payload) {
      throw new Error("Payload is required");
    }
  }

  getData(): ICreatePayload<IRegisterUserAttributes> {
    return super.getData() as ICreatePayload<IRegisterUserAttributes>;
  }
}
