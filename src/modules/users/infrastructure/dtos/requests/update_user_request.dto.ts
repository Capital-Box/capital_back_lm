import { ApiGatewayRequestDTO } from "@lib/infrastructure/dtos/requests/apigateway_request.dto";
import { ICreatePayload } from "@lib/infrastructure/dtos/requests/request.dto";
import { UUID } from "@shared/value_objects/uuid.vo";

interface IUpdateUserAttributes {
  id: string;
  username: string;
  password: string;
  email: string;
  role: string;
  city: string;
}

export class UpdateUserRequestDTO extends ApiGatewayRequestDTO<IUpdateUserAttributes> {
  validatePayload(): void {
    const payload = this.getPayload().attributes;
    if (!payload.username) {
      throw new Error("El nombre de usuario es obligatorio");
    }
  }

  validateParameters(): void {
    if (!this.getPathParameters()) {
      throw new Error("userId is required in the path parameters");
    }
  }

  getPayload(): ICreatePayload<IUpdateUserAttributes> {
    return super.getPayload() as ICreatePayload<IUpdateUserAttributes>;
  }

  getUserId(): string {
    return this.getPayload().attributes.id;
  }
}
