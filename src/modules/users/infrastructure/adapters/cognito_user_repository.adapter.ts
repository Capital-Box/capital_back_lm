import {
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  CognitoIdentityProviderClient
} from "@aws-sdk/client-cognito-identity-provider";
import { User } from "modules/users/domain/entities/user.entity";
import { UserRepositoryPort } from "../ports/user_repository.port";

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
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

}
