import {
  AdminCreateUserCommand,
  AdminDisableUserCommand,
  AdminSetUserPasswordCommand,
  AdminUpdateUserAttributesCommand,
  ListUsersCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import { User } from "modules/users/domain/entities/user.entity";
import { UserRepositoryPort } from "../ports/user_repository.port";
import { IResponse } from "@lib/infrastructure/dtos/responses/response.dto";
import { UserFactory } from "modules/users/application/factories/user.factory";

interface CognitoUserRepositoryDependencies {
  userPoolId: string;
  clientId: string;
}

export class CognitoUserRepository implements UserRepositoryPort {
  private readonly userPoolId: string;
  private readonly clientId: string;

  constructor(
    dependencies: CognitoUserRepositoryDependencies,
    private readonly cognitoClient: CognitoIdentityProviderClient = new CognitoIdentityProviderClient()
  ) {
    this.userPoolId = dependencies.userPoolId;
    this.clientId = dependencies.clientId;
  }

  async save(user: User): Promise<User> {
    try {
      const createUserCommand = new AdminCreateUserCommand({
        UserPoolId: this.userPoolId,
        Username: user.getEmail(),
        TemporaryPassword: user.getPassword(),
        UserAttributes: [
          { Name: "email", Value: user.getEmail() },
          { Name: "email_verified", Value: "true" },
          { Name: "name", Value: user.getUserName() },
          { Name: "custom:role", Value: user.getRole() },
          { Name: "custom:city", Value: user.getCity() },
        ],
        MessageAction: "SUPPRESS",
      });
      await this.cognitoClient.send(createUserCommand);

      const setPasswordCommand = new AdminSetUserPasswordCommand({
        UserPoolId: this.userPoolId,
        Username: user.getEmail(),
        Password: user.getPassword(),
        Permanent: true,
      });
      await this.cognitoClient.send(setPasswordCommand);

      return user;
    } catch (error: any) {
      if (error.name === "UsernameExistsException") {
        throw new Error("The username is already taken.");
      }
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  async update(user: User): Promise<User> {
    try {
      const updateCommand = new AdminUpdateUserAttributesCommand({
        UserPoolId: this.userPoolId,
        Username: user.getEmail(),
        UserAttributes: [
          { Name: "email", Value: user.getEmail() },
          { Name: "name", Value: user.getUserName() },
          { Name: "custom:role", Value: user.getRole() },
          { Name: "custom:city", Value: user.getCity() },
        ],
      });
      await this.cognitoClient.send(updateCommand);

      if (user.getPassword()) {
        const setPasswordCommand = new AdminSetUserPasswordCommand({
          UserPoolId: this.userPoolId,
          Username: user.getEmail(),
          Password: user.getPassword(),
          Permanent: true,
        });
        await this.cognitoClient.send(setPasswordCommand);
      }

      return user;
    } catch (error: any) {
      throw new Error(`Update failed: ${error.message}`);
    }
  }

  // Resolver promesa de delete.
  async delete(userId: string): Promise<Object> {
    try {
      const disableCommand = new AdminDisableUserCommand({
        UserPoolId: this.userPoolId,
        Username: userId,
      });
      await this.cognitoClient.send(disableCommand);

      const updateCommand = new AdminUpdateUserAttributesCommand({
        UserPoolId: this.userPoolId,
        Username: userId,
        UserAttributes: [
          {
            Name: "custom:isDeleted",
            Value: "true",
          },
        ],
      });
      await this.cognitoClient.send(updateCommand);

      return {
        message: "User deleted successfully",
      };
    } catch (error: any) {
      throw new Error(`Delete failed: ${error.message}`);
    }
  }

  async findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }


  // Levantar la base de datos en dynamo para guardar estos datos DynamoDB
  async list(): Promise<User[]> {
    try {

      // traer todo de DynamoDB
      return domainUsers;
    } catch (error: any) {
      throw new Error("Error listing users from Cognito: " + error.message);
    }
  }
}
