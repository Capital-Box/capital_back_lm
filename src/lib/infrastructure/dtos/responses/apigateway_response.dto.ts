import { APIGatewayProxyResultV2 } from "aws-lambda";
import { IResponse, ResponseDTO } from "./response.dto";

export class ApiGatewayResponseDTO<
  TAttributes = unknown
> extends ResponseDTO<TAttributes> {
  constructor(res: IResponse<TAttributes>) {
    super({
      status: res.status,
      payload: res.payload,
    });
  }

  send(): APIGatewayProxyResultV2 {
    const responseDTO = super.send();
    return {
      statusCode: responseDTO.status,
      body: JSON.stringify(responseDTO.payload),
    };
  }
}
