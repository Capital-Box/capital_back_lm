import { ApiGatewayResponseDTO } from "@lib/infrastructure/dtos/responses/apigateway_response.dto";
import { HttpStatus } from "@lib/infrastructure/enums/http_status.enum";

export class DeleteUserResponseDTO extends ApiGatewayResponseDTO {
  constructor(id: string) {
    super({
      status: HttpStatus.OK,
      payload: {
        id: id,
        type: "delete",
        attributes: {},
      },
    });
  }
}
