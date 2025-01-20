import { ApiGatewayRequestDTO } from "@lib/infrastructure/dtos/requests/apigateway_request.dto";
import { ICreatePayload } from "@lib/infrastructure/dtos/requests/request.dto";


interface IRefreshTokenAttributes {
    refreshToken: string;
}

export class RefreshTokenRequestDTO extends ApiGatewayRequestDTO<IRefreshTokenAttributes> {
    validatePayload(): void {
        const payload = this.getPayload().attributes;
        if (!payload.refreshToken) {
            throw new Error("El refreshToken es obligatorio");
        }
    }

    getPayload(): ICreatePayload<IRefreshTokenAttributes> {
        return super.getPayload() as ICreatePayload<IRefreshTokenAttributes>;
    }

    get refreshToken(): string {
        return this.getPayload().attributes.refreshToken;
    }
}