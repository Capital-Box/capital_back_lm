import {
  IRequest,
  IRequestBody,
  IRequestContext,
  IRequestHeaders,
  IRequestPathParameters,
  IRequestQueryParameters,
} from "../types/request.type";

export class RequestDTO {
  private headers: IRequestHeaders;
  private queryParameters: IRequestQueryParameters;
  private pathParameters: IRequestPathParameters;
  private body: string;
  private context: IRequestContext;

  constructor(req: IRequest) {
    this.headers = req.headers;
    this.queryParameters = req.queryParameters;
    this.pathParameters = req.pathParameters;
    this.body = req.body;
    this.context = req.context;
  }

  getHeaders(): IRequestHeaders {
    return this.headers;
  }

  getContext(): IRequestContext {
    return this.context;
  }

  getMultipartHeaders(): { [key: string]: string[] } {
    const headers = this.headers;
    const headersKeys = Object.keys(headers);

    const multipartHeaders = {};
    headersKeys.map((headerKey) => {
      multipartHeaders[headerKey] = headers[headerKey]?.split(",");
    });

    return multipartHeaders;
  }

  getQueryParameters(): IRequestQueryParameters {
    return this.queryParameters;
  }

  getPathParameters(): IRequestPathParameters {
    return this.pathParameters;
  }

  getBody<TAttributes>(): IRequestBody<TAttributes> {
    return JSON.parse(this.body) as IRequestBody<TAttributes>;
  }

  getRequestId(): string {
    return this.context.requestId;
  }

  getSource(): string {
    return this.context.identity.source;
  }

  getSub(): string | undefined {
    return this.context.identity.sub;
  }

  getRequest(): IRequest {
    return {
      headers: this.headers,
      queryParameters: this.queryParameters,
      pathParameters: this.pathParameters,
      body: this.body,
      context: this.context,
    };
  }
}
