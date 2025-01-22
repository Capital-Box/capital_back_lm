import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { User } from "modules/users/domain/entities/user.entity";
import { UserRepositoryPort } from "../ports/user_repository.port";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

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
        username: user.getUserName(),
        password: user.getPassword(),
        email: user.getEmail(),
        role: user.getRole(),
        city: user.getCity(),
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
        "SET #username = :username, #role = :role, #city = :city, #password = :password",
      ExpressionAttributeNames: {
        "#username": "username",
        "#role": "role",
        "#city": "city",
        "#password": "password",
      },
      ExpressionAttributeValues: marshall({
        ":username": user.getUserName(),
        ":role": user.getRole(),
        ":city": user.getCity(),
        ":password": user.getPassword(),
      }),
      ReturnValues: "ALL_NEW",
    };

    try {
      await this.client.send(new UpdateItemCommand(updateParams));
      return user;
    } catch (error: any) {
      throw new Error(`Update failed: ${error.message}`);
    }
  }

  async delete(id: string): Promise<Object> {
    const updateParams = {
      TableName: this.tableName,
      Key: marshall({ PK: id }),
      UpdateExpression: "SET #isDeleted = :val",
      ExpressionAttributeNames: {
        "#isDeleted": "isDeleted",
      },
      ExpressionAttributeValues: marshall({
        ":val": true,
      }),
      ReturnValues: "ALL_NEW",
    };
    try {
      await this.client.send(new UpdateItemCommand(updateParams));
      return {
        message: "User soft-deleted successfully",
      };
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
        return null; // Descartamos si es un soft-deleted
      }

      // const userEntity = new User({
      //   username: data.username,
      //   password: data.password,
      //   email: data.email,
      //   role: data.role,
      //   city: data.city,
      // });
      return userEntity;
    } catch (error: any) {
      throw new Error(`findById failed: ${error.message}`);
    }
  }

  async list(): Promise<User[]> {
    const scanResult = await this.client.send(
      new ScanCommand({ TableName: this.tableName })
    );
    if (!scanResult.Items) return [];
    return scanResult.Items.map((i) => {
      return new User({
        email: i.PK.S || "",
        username: i.username.S || "",
        role: i.role.S || "",
        city: i.city.S || "",
        password: i.password.S || "",
      });
    });
  }
}
