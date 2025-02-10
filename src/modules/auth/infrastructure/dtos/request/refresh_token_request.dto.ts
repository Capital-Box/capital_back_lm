import { ApiGatewayRequestDTO } from "@lib/infrastructure/dtos/requests/apigateway_request.dto";
import { ICreatePayload } from "@lib/infrastructure/dtos/requests/request.dto";


interface IRefreshTokenAttributes {
    refreshToken: string;
}

export class RefreshTokenRequestDTO extends ApiGatewayRequestDTO<IRefreshTokenAttributes> {
    validatePayload(): void {
        const payload = this.getData().attributes;
        if (!payload.refreshToken) {
            throw new Error("El refreshToken es obligatorio");
        }
    }

    getData(): ICreatePayload<IRefreshTokenAttributes> {
        return super.getData() as ICreatePayload<IRefreshTokenAttributes>;
    }

    get refreshToken(): string {
        return this.getData().attributes.refreshToken;
    }
}