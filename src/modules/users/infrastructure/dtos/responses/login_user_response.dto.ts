import { ApiGatewayResponseDTO } from "@lib/infrastructure/dtos/responses/apigateway_response.dto";
import { HttpStatus } from "@lib/infrastructure/enums/http_status.enum";

interface ILoginAttributes {
  id: string;
  access_token: string;
  refresh_token: string;
}

export class LoginUserResponseDTO extends ApiGatewayResponseDTO<ILoginAttributes> {
  constructor(tokens: ILoginAttributes) {
    super();
    this.setStatus(HttpStatus.OK);
    this.setPayload({
      id: tokens.id,
      type: "auth",
      attributes: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      },
    });
  }
}
