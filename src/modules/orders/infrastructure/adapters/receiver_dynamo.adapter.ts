import { ReceiverRepositoryPort } from '../ports/receiver_repository.port';
import { Receiver } from 'modules/orders/domain/entities/receiver.entity';

import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

export class ReceiverDynamoAdapter implements ReceiverRepositoryPort {
  constructor(
    private tableName: string,
    private client: DynamoDBClient = new DynamoDBClient(),
  ) {}

  async save(receiver: Receiver): Promise<void> {
    const receiverMarshall = marshall({
      document_number: receiver.getDocument().getDocumentNumber(),
      document_type: receiver.getDocument().getDocumentType(),
      first_name: receiver.getFirstName(),
      last_name: receiver.getLastName(),
      email: receiver.getEmail().getEmail(),
      phone_number: receiver.getPhone().getNumber(),
      phone_area_code: receiver.getPhone().getAreaCode(),
      phone_type: receiver.getPhone().getPhoneType(),
    });

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: receiverMarshall,
    });

    await this.client.send(command);
  }
}
