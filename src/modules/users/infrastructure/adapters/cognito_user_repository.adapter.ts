import { User } from "modules/users/domain/entities/user.entity";
import { UserRepositoryPort } from "../ports/user_repository.port";
import {
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import { Roles } from "modules/users/domain/enums/roles.enum";

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

  private readonly roleGroups: { [key in Roles]: string } = {
    [Roles.ADMIN]: "users-admin-group",
    [Roles.USER]: "users-driver-group",
  };

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

      const addUserToGroupCommand = new AdminAddUserToGroupCommand({
        UserPoolId: this.userPoolId,
        Username: user.getEmail(),
        GroupName: this.roleGroups[user.getRole()],
      });

      await this.cognitoClient.send(addUserToGroupCommand);

      return user;
    } catch (error: any) {
      if (error.name === "UsernameExistsException") {
        throw new Error("The username is already taken.");
      }
      throw new Error(`Registration failed: ${error.message}`);
    }
  }
}
