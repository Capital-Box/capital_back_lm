import { ApiGatewayResponseDTO } from "@lib/infrastructure/dtos/responses/apigateway_response.dto";
import { HttpStatus } from "@lib/infrastructure/enums/http_status.enum";



export class LogOutResponseDTO extends ApiGatewayResponseDTO {
  constructor() {
    super({
      status: HttpStatus.OK,
      payload: {
        id: "",
        type: "revoke",
        attributes:{} ,
      },
    });
  }
}
