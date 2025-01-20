import { ApiGatewayResponseDTO } from "@lib/infrastructure/dtos/responses/apigateway_response.dto";
import { HttpStatus } from "@lib/infrastructure/enums/http_status.enum";

interface IRefreshTokenAttributes {
  access_token: string;
  refresh_token: string;
}

export class RefreshTokenResponseDTO extends ApiGatewayResponseDTO<IRefreshTokenAttributes> {
  constructor(tokens: IRefreshTokenAttributes) {
    super({
      status: HttpStatus.OK,
      payload: {
        id: "",
        type: "auth",
        attributes: tokens,
      },
    });
  }
}
