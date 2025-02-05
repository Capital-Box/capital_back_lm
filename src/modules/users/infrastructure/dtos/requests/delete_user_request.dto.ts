import { ApiGatewayRequestDTO } from "@lib/infrastructure/dtos/requests/apigateway_request.dto";

interface IDeleteUserAttributes {
    userId: string;
}

export class DeleteUserRequestDTO extends ApiGatewayRequestDTO<IDeleteUserAttributes> {
    validatePayload(): void {
        if(!this.getPathParameters()) {
            throw new Error("userId is required in the path parameters");
        }
    }

    validateParameters(): void {
        if(!this.getPathParameters()?.userId) {
            throw new Error("userId is required in the path parameters");
        }
    }

    getUserId(): string {
        return this.getPathParameters().userId!;
      }
}