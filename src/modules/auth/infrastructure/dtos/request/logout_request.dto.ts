import { ApiGatewayRequestDTO } from "@lib/infrastructure/dtos/requests/apigateway_request.dto";
import { ICreatePayload } from "@lib/infrastructure/dtos/requests/request.dto";


interface IlogoutAttributes {
    refresh_token: string;
}

export class LogOutRequestDTO extends ApiGatewayRequestDTO<IlogoutAttributes> {
    validatePayload(): void {
        const payload = this.getPayload().attributes;
        if (!payload.refresh_token) {
            throw new Error("El refresh_token es obligatorio");
        }
    }

    getPayload(): ICreatePayload<IlogoutAttributes> {
        return super.getPayload() as ICreatePayload<IlogoutAttributes>;
    }

    get refresh_token(): string {
        return this.getPayload().attributes.refresh_token;
    }
    
}