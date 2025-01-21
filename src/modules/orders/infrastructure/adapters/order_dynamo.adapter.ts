import { Order } from "modules/orders/domain/entities/order.entity";
import { OrderRepositoryPort } from "../ports/order_repository.port";

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";


export class OrderDynamoAdapter implements OrderRepositoryPort {
  constructor(private tableName: string, private client: DynamoDBClient = new DynamoDBClient()) { }

  async save(order: Order): Promise<void> {
    const orderMarshall = marshall({
      id: order.getId(),
      external_provider: order.getExternalProvider(),
      external_id: order.getExternalId(),
      receiver_id: order.getReceiverId(),
      main_status: order.getMainStatus(),
      sub_status: order.getSubStatus(),
      created_date: order.getCreatedDate(),
      last_updated: order.getLastUpdated()
    })

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: orderMarshall
    })

    await this.client.send(command);
  }
}