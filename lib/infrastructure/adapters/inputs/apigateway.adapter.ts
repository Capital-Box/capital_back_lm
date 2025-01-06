import { RequestDTO } from "../../dtos/request.dto";
import { ResponseDTO } from "../../dtos/response.dto";
import { IRequest } from "../../types/request.type";
import { IResponse } from "../../types/response.type";
import { InputAdapter } from "./input.adapter";
import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';

export abstract class ApiGatewayAdapter extends InputAdapter<APIGatewayProxyEvent, APIGatewayProxyResultV2> {
  protected transformRequest(request: APIGatewayProxyEvent): IRequest {
    return {
      headers: request.headers,
      queryParameters: request.queryStringParameters || {},
      pathParameters: request.pathParameters || {},
      body: request.body || '{}',
      context: {
        requestId: request.requestContext.requestId,
        identity: {
          source: request.requestContext.identity.sourceIp,
          sub: request.requestContext.identity.user || ''
        }
      }
    }
  }

  protected transformResponse(response: IResponse): APIGatewayProxyResultV2 {
    return {
      statusCode: response.statusCode,
      headers: response.headers,
      body: response.body
    }
  }

  protected abstract invoke(req: RequestDTO): Promise<ResponseDTO>;

}