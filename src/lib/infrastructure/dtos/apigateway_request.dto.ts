import {
  APIGatewayEventRequestContextWithAuthorizer,
  APIGatewayProxyEventBase,
  APIGatewayProxyEventHeaders,
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda";

export class ApiGatewayRequestDTO<TAuthorizerMethod> {
  private headers: APIGatewayProxyEventHeaders;
  private queryParameters: APIGatewayProxyEventQueryStringParameters;
  private pathParameters: APIGatewayProxyEventPathParameters;
  private body: string;
  private context: APIGatewayEventRequestContextWithAuthorizer<TAuthorizerMethod>;

  constructor(apiGatewayRequest: APIGatewayProxyEventBase<TAuthorizerMethod>) {
    this.headers = apiGatewayRequest.headers;
    this.queryParameters = apiGatewayRequest.queryStringParameters || {};
    this.pathParameters = apiGatewayRequest.pathParameters || {};
    this.body = apiGatewayRequest.body || "{}";
    this.context = apiGatewayRequest.requestContext;
  }

  getHeaders(): APIGatewayProxyEventHeaders {
    return this.headers;
  }

  getQueryParameters(): APIGatewayProxyEventQueryStringParameters {
    return this.queryParameters;
  }

  getPathParameters(): APIGatewayProxyEventPathParameters {
    return this.pathParameters;
  }

  getBody(): string {
    return this.body;
  }

  getContext(): APIGatewayEventRequestContextWithAuthorizer<TAuthorizerMethod> {
    return this.context;
  }
}
