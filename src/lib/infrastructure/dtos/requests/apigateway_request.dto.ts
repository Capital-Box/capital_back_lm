import { APIGatewayProxyEventV2 } from "aws-lambda";
import { IRequestContext, IRequestPayload, RequestDTO } from "./request.dto";

type IRequestHeaders = {
  [key: string]: string | undefined;
};

type IRequestHeadersMultipart = {
  [key: string]: string[];
};

type IRequestQueryParameters = {
  [key: string]: string | undefined;
};

type IRequestPathParameters = {
  [key: string]: string | undefined;
};

export abstract class ApiGatewayRequestDTO<
  TAttributes = any
> extends RequestDTO<TAttributes> {
  private headers: IRequestHeaders;
  private queryParameters: IRequestQueryParameters;
  private pathParameters: IRequestPathParameters;

  constructor(event: APIGatewayProxyEventV2) {
    const payload: IRequestPayload<TAttributes> = event.body
      ? JSON.parse(event.body)
      : null;
    const context: IRequestContext = {
      requestId: event.requestContext.requestId,
      identity: {
        source: event.requestContext.apiId,
        sub: '',
      },
    };
    super({
      payload,
      context,
    });
    this.headers = event.headers;
    this.queryParameters = event.queryStringParameters || {};
    this.pathParameters = event.pathParameters || {};
  }

  getHeaders(): IRequestHeaders {
    return this.headers;
  }

  getMultipartHeaders(): IRequestHeadersMultipart {
    const headers = this.headers;
    const headersKeys = Object.keys(headers);

    const multipartHeaders: IRequestHeadersMultipart = {};
    headersKeys.map((headerKey: keyof IRequestHeaders) => {
      if (headers[headerKey])
        multipartHeaders[headerKey] = headers[headerKey].split(",");
    });

    return multipartHeaders;
  }

  getQueryParameters(): IRequestQueryParameters {
    return this.queryParameters;
  }

  getPathParameters(): IRequestPathParameters {
    return this.pathParameters;
  }
}
