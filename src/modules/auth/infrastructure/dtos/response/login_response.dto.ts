import { ApiGatewayResponseDTO } from "@lib/infrastructure/dtos/responses/apigateway_response.dto";
import { HttpStatus } from "@lib/infrastructure/enums/http_status.enum";

interface ILoginAttributes {
  access_token: string;
  refresh_token: string;
}

export class LoginResponseDTO extends ApiGatewayResponseDTO<ILoginAttributes> {
  constructor(tokens: ILoginAttributes) {
    super({
      status: HttpStatus.OK,
      payload: {
        id: "",
        type: "auth",
        attributes: tokens
      },
    });
  }
}