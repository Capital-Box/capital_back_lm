import { ApiGatewayRequestDTO } from "@lib/infrastructure/dtos/requests/apigateway_request.dto";
import { ICreatePayload } from "@lib/infrastructure/dtos/requests/request.dto";

interface ICreateAuthAttributes {
    username: string;
    email: string;
    password: string;

}

export class CreateAuthDTO extends ApiGatewayRequestDTO<ICreateAuthAttributes> {
    validatePayload(): void {
        const payload = this.getData().attributes;
        if (!payload.username) {
            throw new Error("El nombre de usuario es obligatorio");
        }
    }

    getData(): ICreatePayload<ICreateAuthAttributes> {
        return super.getData() as ICreatePayload<ICreateAuthAttributes>;
    }

    get username(): string {
        return this.getData().attributes.username;
    }

    get password(): string {
        return this.getData().attributes.password;
    }
}