import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { OrderHistoryMapper } from 'modules/orders/application/mappers/order_history.mapper';
import { OrderHistory } from 'modules/orders/domain/entities/order_history.entity';

export class OrderHistoryDynamoAdapter {
  constructor(
    private tableName: string,
    private client: DynamoDBClient = new DynamoDBClient(),
  ) {}

  async save(orderHistory: OrderHistory): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: OrderHistoryMapper.toDynamo(orderHistory),
    };
    const command = new PutItemCommand(params);
    await this.client.send(command);
  }
}
