import { ApiGatewayRequestDTO } from "@lib/infrastructure/dtos/requests/apigateway_request.dto";
import { ICreatePayload } from "@lib/infrastructure/dtos/requests/request.dto";

interface ILoginUserAttributes {
    username: string;
    password: string;
}

export class LoginRequestDTO extends ApiGatewayRequestDTO<ILoginUserAttributes> {
    validatePayload(): void {
        const payload = this.getData().attributes;
        if (!payload.username) {
            throw new Error("El nombre de usuario es obligatorio");
        }
    }

    getData(): ICreatePayload<ILoginUserAttributes> {
        return super.getData() as ICreatePayload<ILoginUserAttributes>;
    }

    get username(): string {
        return this.getData().attributes.username;
    }

    get password(): string {
        return this.getData().attributes.password;
    }
}