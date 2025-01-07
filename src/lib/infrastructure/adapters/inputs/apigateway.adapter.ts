import { ApiGatewayRequestDTO } from "../../dtos/apigateway_request.dto";
import { RequestDTO } from "../../dtos/request.dto";
import { ResponseDTO } from "../../dtos/response.dto";
import { ApiGatewayMapper } from "../../mappers/apigateway.mapper";
import { ApiGatewayPort } from "../../ports/inputs/apigateway.port";
import { InputAdapter } from "./input.adapter";
import { APIGatewayProxyEventBase, APIGatewayProxyResultV2 } from "aws-lambda";

export abstract class ApiGatewayAdapter
  extends InputAdapter<
    APIGatewayProxyEventBase<{ user_id?: string }>,
    APIGatewayProxyResultV2
  >
  implements ApiGatewayPort
{
  async handle(
    req: APIGatewayProxyEventBase<{ user_id?: string }>
  ): Promise<APIGatewayProxyResultV2> {
    const apiGatewayRequestDTO = new ApiGatewayRequestDTO(req);
    const requestDTO = ApiGatewayMapper.toRequestDTO(apiGatewayRequestDTO);
    const responseDTO = await this.invoke(requestDTO);
    responseDTO.setContext(requestDTO.getContext());
    return ApiGatewayMapper.toResponseDTO(responseDTO);
  }

  protected abstract invoke(req: RequestDTO): Promise<ResponseDTO>;
}