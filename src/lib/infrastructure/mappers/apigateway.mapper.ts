import { APIGatewayProxyResultV2 } from "aws-lambda";
import { ApiGatewayRequestDTO } from "../dtos/apigateway_request.dto";
import { RequestDTO } from "../dtos/request.dto";
import { ResponseDTO } from "../dtos/response.dto";

export class ApiGatewayMapper {
  static toRequestDTO(
    apiGatewayRequest: ApiGatewayRequestDTO<{ user_id?: string }>
  ): RequestDTO {
    return new RequestDTO({
      headers: apiGatewayRequest.getHeaders(),
      queryParameters: apiGatewayRequest.getQueryParameters(),
      pathParameters: apiGatewayRequest.getPathParameters(),
      body: apiGatewayRequest.getBody(),
      context: {
        requestId: apiGatewayRequest.getContext().requestId,
        identity: {
          source: apiGatewayRequest.getContext().identity.sourceIp,
          sub: apiGatewayRequest.getContext().authorizer?.["user_id"],
        },
      },
    });
  }

  static toResponseDTO(responseDTO: ResponseDTO): APIGatewayProxyResultV2 {
    return responseDTO.send();
  }
}
