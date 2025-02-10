import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  ReturnValue,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { User } from 'modules/users/domain/entities/user.entity';
import { UserRepositoryPort } from '../ports/user_repository.port';
import { UserFactory } from 'modules/users/application/factories/user.factory';
import { IHasheable } from 'modules/users/application/interfaces/iHash.interface';
import { UserDTO } from 'modules/users/application/dtos/user.dto';

interface DynamoDbUserRepositoryDependencies {
  tableName: string;
}

export class DynamoDbUserRepository implements UserRepositoryPort {
  private readonly tableName: string;
  private readonly client: DynamoDBClient;

  constructor(deps: DynamoDbUserRepositoryDependencies) {
    this.tableName = deps.tableName;
    this.client = new DynamoDBClient({});
  }

  async save(user: User): Promise<User> {
    const params = {
      TableName: this.tableName,
      Item: marshall({
        PK: user.getId(),
        name: user.getName(),
        password: user.getPassword(false),
        email: user.getEmail(),
        role: user.getRole(),
        city: user.getCity(),
        createdDate: user.getCreatedDate().toISOString(),
        lastUpdated: user.getLastUpdated().toISOString(),
        isDeleted: false,
      }),
      ConditionExpression: 'attribute_not_exists(PK)',
    };

    try {
      await this.client.send(new PutItemCommand(params));
      return user;
    } catch (error: any) {
      if (error.name === 'ConditionalCheckFailedException') {
        throw new Error('El usuario ya existe en DynamoDB');
      }
      throw new Error(`save failed: ${error.message}`);
    }
  }

  async update(user: User): Promise<User> {
    console.log('user', user);
    const updateParams = {
      TableName: this.tableName,
      Key: marshall({ PK: user.getId() }),
      UpdateExpression:
        'SET #name = :name, #role = :role, #city = :city, #password = :password, #lastUpdated = :lastUpdated',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#role': 'role',
        '#city': 'city',
        '#password': 'password',
        '#lastUpdated': 'lastUpdated',
      },
      ExpressionAttributeValues: marshall(
        {
          ':name': user.getName(),
          ':role': user.getRole(),
          ':city': user.getCity(),
          ':password': user.getPassword(),
          ':lastUpdated': user.getLastUpdated().toISOString(),
        },
        { removeUndefinedValues: true },
      ),
      ConditionExpression: 'attribute_exists(PK)',
      ReturnValues: ReturnValue.ALL_NEW,
    };
    console.log('updateParams', updateParams);
    try {
      await this.client.send(new UpdateItemCommand(updateParams));
      return user;
    } catch (error: any) {
      throw new Error(`Update failed: ${error.message}`);
    }
  }

  async delete(id: string): Promise<void> {
    const updateParams = {
      TableName: this.tableName,
      Key: marshall({ PK: id }),
      UpdateExpression: 'SET #isDeleted = :val, #lastUpdated = :lastUpdated',
      ExpressionAttributeNames: {
        '#isDeleted': 'isDeleted',
        '#lastUpdated': 'lastUpdated',
      },
      ExpressionAttributeValues: marshall({
        ':val': true,
        ':lastUpdated': new Date().toISOString(),
      }),
      ReturnValues: ReturnValue.ALL_NEW,
    };
    try {
      await this.client.send(new UpdateItemCommand(updateParams));
    } catch (error: any) {
      throw new Error(`Delete failed: ${error.message}`);
    }
  }

  async findById(id: string, hashService: IHasheable): Promise<User | null> {
    const getParams = {
      TableName: this.tableName,
      Key: marshall({ PK: id }),
    };
    try {
      const { Item } = await this.client.send(new GetItemCommand(getParams));
      if (!Item) {
        return null;
      }
      const data = unmarshall(Item);
      data.id = data.PK;
      if (data.isDeleted) {
        console.log('User is deleted');
        return null;
      }
      return UserFactory.load(data as UserDTO, hashService);
    } catch (error: any) {
      throw new Error(`findById failed: ${error.message}`);
    }
  }

  async findByEmail(email: string, hashService: IHasheable): Promise<User | null> {
    const params = {
      TableName: this.tableName,
      IndexName: 'email',
      KeyConditionExpression: '#email = :email',
      ExpressionAttributeNames: {
        '#email': 'email',
      },
      ExpressionAttributeValues: marshall({
        ':email': email,
      }),
    };
    const result = await this.client.send(new QueryCommand(params));
    if (!result.Items || !result.Items.length) {
      return null;
    }
    const data = unmarshall(result.Items[0]);
    if (data.isDeleted) {
      return null;
    }
    data.id = data.PK;
    return UserFactory.load(data as UserDTO, hashService);

  }

  async list(): Promise<User[]> {
    const params = {
      TableName: this.tableName,
      IndexName: 'allUsers',
      KeyConditionExpression: '#all = :all',
      ExpressionAttributeNames: {
        '#all': 'all',
      },
      ExpressionAttributeValues: marshall({
        ':all': 'USER',
      }),
      ScanIndexForward: false,
    };
    const result = await this.client.send(new QueryCommand(params));
    if (!result.Items) return [];
    return result.Items.map((item) => {
      const data = unmarshall(item);
      return new User({
        id: data.PK,
        name: data.name,
        password: data.password,
        email: data.email,
        role: data.role,
        city: data.city,
        createdDate: data.createdDate,
        lastUpdated: data.lastUpdated,
      });
    });
  }
}
