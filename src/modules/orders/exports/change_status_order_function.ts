import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ChangeOrderStatusRequestDTO } from '../infrastructure/dto/requests/change_order_status_request.dto';
import { OrderApiGatewayAdapter } from '../infrastructure/adapters/order_apigateway.adapter';
import { ClassValidatorService } from '@lib/application/service/class_validator.service';
import { OrderService } from '../application/services/order.service';
import { OrderDynamoAdapter } from '../infrastructure/adapters/order_dynamo.adapter';
import { ReceiverDynamoAdapter } from '../infrastructure/adapters/receiver_dynamo.adapter';

const orderDynamoAdapter = new OrderDynamoAdapter(process.env.ORDER_TABLE_NAME);
const receiverDynamoAdapter = new ReceiverDynamoAdapter(
  process.env.RECEIVER_TABLE_NAME,
);

const orderService = new OrderService({
  orderRepository: orderDynamoAdapter,
  receiverRepository: receiverDynamoAdapter,
});

const orderApiGatewayAdapter = new OrderApiGatewayAdapter({
  service: orderService,
  validator: new ClassValidatorService(),
});

export const handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  const request = new ChangeOrderStatusRequestDTO(event);
  const response = await orderApiGatewayAdapter.changeStatus(request);
  return response.send();
};
