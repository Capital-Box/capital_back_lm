import { InputPort } from "./input.port";
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export interface ApiGatewayPort extends InputPort<APIGatewayEvent, APIGatewayProxyResult> {
  handle(event: APIGatewayEvent): Promise<APIGatewayProxyResult>;
}