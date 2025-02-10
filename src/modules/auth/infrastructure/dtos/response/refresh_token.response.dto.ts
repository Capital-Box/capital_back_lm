import { ApiGatewayResponseDTO } from "@lib/infrastructure/dtos/responses/apigateway_response.dto";
import { HttpStatus } from "@lib/infrastructure/enums/http_status.enum";

interface IRefreshTokenAttributes {
  access_token: string;
  refresh_token: string;
}

export class RefreshTokenResponseDTO extends ApiGatewayResponseDTO<IRefreshTokenAttributes> {
  constructor(tokens: IRefreshTokenAttributes) {
    super();
    this.setStatus(HttpStatus.OK);
    this.setPayload({
      id: "",
      type: "auth",
      attributes: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      },
    });
  }
}
