import { ApiGatewayRequestDTO } from "@lib/infrastructure/dtos/requests/apigateway_request.dto";
import { ICreatePayload } from "@lib/infrastructure/dtos/requests/request.dto";

interface ILoginUserAttributes {
    username: string;
    password: string;
}

export class LoginUserRequestDTO extends ApiGatewayRequestDTO<ILoginUserAttributes> {
    validatePayload(): void {
        const payload = this.getPayload().data;
        if (!payload) {
            throw new Error("El nombre de usuario es obligatorio");
        }
    }

    getData(): ICreatePayload<ILoginUserAttributes> {
        return super.getPayload() as ICreatePayload<ILoginUserAttributes>;
    }
}