import { APIGatewayProxyResultV2 } from 'aws-lambda';
import { ResponseDTO } from './response.dto';

type HeaderResponse = {
  [header: string]: boolean | number | string;
};

export class ApiGatewayResponseDTO<
  TAttributes = unknown,
> extends ResponseDTO<TAttributes> {
  private headers: HeaderResponse = {
    'Content-Type': 'application/json',
  };

  constructor() {
    super();
  }

  addHeader(header: HeaderResponse) {
    Object.keys(header).forEach(
      (headerKey) => (this.headers[headerKey] = header[headerKey]),
    );
  }

  send(): APIGatewayProxyResultV2 {
    return {
      statusCode: this.getStatus(),
      body: JSON.stringify(super.send()),
      headers: this.headers,
    };
  }
}
