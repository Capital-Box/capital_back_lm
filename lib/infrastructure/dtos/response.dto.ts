import { IResponse, IResponseBody, IResponseData, IResponseErrors, IResponseHeaders } from "../types/response.type";

export class ResponseDTO {
  private headers: IResponseHeaders;
  private body: IResponseBody;
  private statusCode: number;

  constructor() { }

  setHeaders(headers: IResponseHeaders): void {
    this.headers = headers;
  }

  addHeader(key: string, value: string): void {
    this.headers[key] = value;
  }

  private setBody<TAttributes>(body: IResponseBody<TAttributes>): void {
    this.body = body as IResponseBody;
  }

  setData<TAttributes>(data: IResponseData<TAttributes> | undefined): void {
    this.setBody({ ...this.body, data });
  }

  setErrors(errors: IResponseErrors): void {
    this.setBody({ ...this.body, errors });
  }

  setStatusCode(statusCode: number): void {
    this.statusCode = statusCode;
  }

  send(): IResponse {
    return {
      headers: this.headers,
      body: JSON.stringify(this.body),
      statusCode: this.statusCode
    }
  }

}