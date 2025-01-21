import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { OrderApiGatewayAdapter } from "../infrastructure/adapters/order_apigateway.adapter";
import { OrderService } from "../application/services/order.service";
import { OrderDynamoAdapter } from "../infrastructure/adapters/order_dynamo.adapter";
import { ReceiverDynamoAdapter } from "../infrastructure/adapters/receiver_dynamo.adapter";
import { CreateOrderRequestDTO } from "../infrastructure/dto/requests/create_order_request.dto";

const orderDynamoAdapter = new OrderDynamoAdapter(process.env.ORDER_TABLE_NAME);
const receiverDynamoAdapter = new ReceiverDynamoAdapter(process.env.RECEIVER_TABLE_NAME);

const orderService = new OrderService({
  orderRepository: orderDynamoAdapter,
  receiverRepository: receiverDynamoAdapter
})

const orderApiGatewayAdapter = new OrderApiGatewayAdapter({
  service: orderService
})

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  const request = new CreateOrderRequestDTO(event);
  const response = await orderApiGatewayAdapter.create(request);
  return response.send();
};
