import {
  BatchWriteItemCommand,
  BatchWriteItemInput,
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import { PackageRepositoryPort } from '../ports/package_repository.port';
import { Package } from 'modules/orders/domain/entities/package.entity';
import { PackageMapper } from 'modules/orders/application/mappers/package.mapper';

export class PackageDynamoAdapter implements PackageRepositoryPort {
  constructor(
    private tableName: string,
    private client: DynamoDBClient = new DynamoDBClient(),
  ) {}

  async saveMany(packages: Package[]): Promise<void> {
    const mappedPackages = packages.map((pack) => PackageMapper.toDynamo(pack));
    const params: BatchWriteItemInput = {
      RequestItems: {
        [this.tableName]: mappedPackages.map((pack) => {
          return {
            PutRequest: { Item: pack },
          };
        }),
      },
    };
    const command = new BatchWriteItemCommand(params);
    await this.client.send(command);
  }
}
