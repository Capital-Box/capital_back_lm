import { IValidator } from "@lib/application/interfaces/validator.interface";
import { ApiGatewayRequestDTO } from "@lib/infrastructure/dtos/requests/apigateway_request.dto";
import { IUpdatePayload } from "@lib/infrastructure/dtos/requests/request.dto";

interface IUpdateUserAttributes {
  id: string;
  name: string;
  password: string;
  email: string;
  role: string;
  city: string;
}

export class UpdateUserRequestDTO extends ApiGatewayRequestDTO<IUpdateUserAttributes> {
  validatePayload(): void {
    const payload = this.getPayload();
    if (!payload.data) {
      throw new Error("El nombre de usuario es obligatorio");
    }
  }

  validateParameters(): void {
    if (!this.getPathParameters()) {
      throw new Error("userId is required in the path parameters");
    }
  }

  getData(): IUpdatePayload<IUpdateUserAttributes> {
    return super.getData() as IUpdatePayload<IUpdateUserAttributes>;
  }

  getUserId(): string {
    return this.getData().id;
  }
}
