import { InputPort } from "./input.port";
import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";

export interface ApiGatewayPort
  extends InputPort<APIGatewayProxyEvent, APIGatewayProxyResultV2> {
  handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2>;
}
