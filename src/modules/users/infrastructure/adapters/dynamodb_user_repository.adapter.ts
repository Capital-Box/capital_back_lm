import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ReturnValue,
  ScanCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { UUID } from "@shared/value_objects/uuid.vo";
import { User } from "modules/users/domain/entities/user.entity";
import { City } from "modules/users/domain/value_objects/city.vo";
import { Email } from "modules/users/domain/value_objects/email.vo";
import { Password } from "modules/users/domain/value_objects/password.vo";
import { Role } from "modules/users/domain/value_objects/role.vo";
import { UserRepositoryPort } from "../ports/user_repository.port";

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
        password: user.getPassword(),
        email: user.getEmail(),
        role: user.getRole(),
        city: user.getCity(),
        createdDate: user.getCreatedDate().toISOString(),
        lastUpdated: user.getLastUpdated().toISOString(),
        isDeleted: false,
      }),
      ConditionExpression: "attribute_not_exists(PK)",
    };

    try {
      await this.client.send(new PutItemCommand(params));
      return user;
    } catch (error: any) {
      if (error.name === "ConditionalCheckFailedException") {
        throw new Error("El usuario ya existe en DynamoDB");
      }
      throw new Error(`save failed: ${error.message}`);
    }
  }

  async update(user: User): Promise<User> {
    const updateParams = {
      TableName: this.tableName,
      Key: marshall({ PK: user.getId() }),
      UpdateExpression:
        "SET #name = :name, #role = :role, #city = :city, #password = :password, #lastUpdated = :lastUpdated",
      ExpressionAttributeNames: {
        "#name": "name",
        "#role": "role",
        "#city": "city",
        "#password": "password",
        "#lastUpdated": "lastUpdated",
      },
      ExpressionAttributeValues: marshall({
        ":name": user.getName(),
        ":role": user.getRole(),
        ":city": user.getCity(),
        ":password": user.getPassword(),
        ":lastUpdated": user.newDateISOString(),
      }),
      ConditionExpression: "attribute_exists(PK)",
      ReturnValues: ReturnValue.ALL_NEW,
    };
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
      UpdateExpression: "SET #isDeleted = :val, #lastUpdated = :lastUpdated",
      ExpressionAttributeNames: {
        "#isDeleted": "isDeleted",
        "#lastUpdated": "lastUpdated",
      },
      ExpressionAttributeValues: marshall({
        ":val": true,
        ":lastUpdated": new Date().toISOString(),
      }),
      ReturnValues: ReturnValue.ALL_NEW,
    };
    try {
      await this.client.send(new UpdateItemCommand(updateParams));
    } catch (error: any) {
      throw new Error(`Delete failed: ${error.message}`);
    }
  }

  async findById(id: string): Promise<User | null> {
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
      if (data.isDeleted) {
        console.log("User is deleted");
        return null;
      }
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

    } catch (error: any) {
      throw new Error(`findById failed: ${error.message}`);
    }
  }

  async list(): Promise<User[]> {
    const scanResult = await this.client.send(
      new ScanCommand({ TableName: this.tableName })
    );
    if (!scanResult.Items) return [];
    return scanResult.Items.map((item) => {
      const unmarshalled = unmarshall(item);
      return new User({
        id: unmarshalled.PK,
        name: unmarshalled.name,
        password: unmarshalled.password,
        email: unmarshalled.email,
        role: unmarshalled.role,
        city: unmarshalled.city,
        createdDate: unmarshalled.createdDate,
        lastUpdated: unmarshalled.lastUpdated,
      });
    });
  }
}
