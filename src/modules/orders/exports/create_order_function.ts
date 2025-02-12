import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { OrderApiGatewayAdapter } from '../infrastructure/adapters/order_apigateway.adapter';
import { OrderService } from '../application/services/order.service';
import { OrderDynamoAdapter } from '../infrastructure/adapters/order_dynamo.adapter';
import { ReceiverDynamoAdapter } from '../infrastructure/adapters/receiver_dynamo.adapter';
import { CreateOrderRequestDTO } from '../infrastructure/dto/requests/create_order_request.dto';
import { ClassValidatorService } from '@lib/application/service/class_validator.service';
import { PackageDynamoAdapter } from '../infrastructure/adapters/package_dynamo.adapter';
import { OrderHistoryService } from '../application/services/order_history.service';
import { OrderHistoryDynamoAdapter } from '../infrastructure/adapters/order_history_dynamo.adapter';
import { OrderStatusEventSubscriber } from '../application/subscribers/order_status_event.subscriber';
import { Publisher } from '@lib/application/publisher';

const orderDynamoAdapter = new OrderDynamoAdapter(process.env.ORDER_TABLE_NAME);
const receiverDynamoAdapter = new ReceiverDynamoAdapter(
  process.env.RECEIVER_TABLE_NAME,
);
const packageDynamoAdapter = new PackageDynamoAdapter(
  process.env.PACKAGE_TABLE_NAME,
);

const orderHistoryRepository = new OrderHistoryDynamoAdapter(
  process.env.ORDER_HISTORY_TABLE_NAME,
);

const orderHistoryService = new OrderHistoryService(orderHistoryRepository);

const orderHistorySubscriber = new OrderStatusEventSubscriber(
  orderHistoryService,
);

const orderPublisher = new Publisher().subscribe(orderHistorySubscriber);

const orderService = new OrderService({
  orderRepository: orderDynamoAdapter,
  receiverRepository: receiverDynamoAdapter,
  packageRepository: packageDynamoAdapter,
  publisher: orderPublisher,
});

const classValidatorService = new ClassValidatorService();

const orderApiGatewayAdapter = new OrderApiGatewayAdapter({
  service: orderService,
  validator: classValidatorService,
});

export const handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  const request = new CreateOrderRequestDTO(event);
  const response = await orderApiGatewayAdapter.create(request);
  return response.send();
};
