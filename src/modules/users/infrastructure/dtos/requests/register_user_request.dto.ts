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
    const payload = this.getPayload().attributes;
    console.log(payload);
    if (!payload.password) {
      throw new Error("Password is required");
    }
    if (!payload.email) {
      throw new Error("Email is required");
    }
    if (!payload.role) {
      throw new Error("Role is required");
    }
    if (!payload.city) {
      throw new Error("City is required");
    }
    if (!payload.name) {
      throw new Error("Name is required");
    }
  }

  getPayload(): ICreatePayload<IRegisterUserAttributes> {
    return super.getPayload() as ICreatePayload<IRegisterUserAttributes>;
  }
}
