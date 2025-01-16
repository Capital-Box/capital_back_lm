import {
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import { CognitoRegisterPort } from "../../ports/cognito_register.port";
import {
  RegisterUserRequestDTO,
  RegisterUserResponseDTO,
} from "../../dtos/register_user.dto";

export class CognitoRegisterAdapter implements CognitoRegisterPort {
  private cognitoClient: CognitoIdentityProviderClient;

  constructor(
    private readonly userPoolId: string,
    private readonly clientId: string
  ) {
    this.cognitoClient = new CognitoIdentityProviderClient({});
  }

  async handle(
    input: RegisterUserRequestDTO
  ): Promise<RegisterUserResponseDTO> {
    const { name, password, email, role, city } = input;

    if (!name || !email || !password) {
      throw new Error("Username, email, and password are required.");
    }

    try {
      // Step 1: Create the user without sending a temporary password email
      const createUserCommand = new AdminCreateUserCommand({
        UserPoolId: this.userPoolId,
        Username: email,
        TemporaryPassword: password,
        UserAttributes: [
          { Name: "email", Value: email },
          { Name: "email_verified", Value: "true" },
          { Name: "name", Value: name },
          { Name: "custom:role", Value: role || "USER" },
          { Name: "custom:city", Value: city || "CORDOBA" },
        ],
        MessageAction: "SUPPRESS",
      });

      await this.cognitoClient.send(createUserCommand);

      // Step 2: Set Password as permanent
      const setPasswordCommand = new AdminSetUserPasswordCommand({
        UserPoolId: this.userPoolId,
        Username: email,
        Password: password,
        Permanent: true,
      });

      await this.cognitoClient.send(setPasswordCommand);

      //Step 3: Add user to group
      if (role) {
        const groupName = this.mapRoleToGroupName(role);
        const addGroupCommand = new AdminAddUserToGroupCommand({
          UserPoolId: this.userPoolId,
          Username: email,
          GroupName: groupName,
        });
        await this.cognitoClient.send(addGroupCommand);
      }

      // Step 4: Return Success Response
      return new RegisterUserResponseDTO(
        email,
        "User successfully registered."
      );
    } catch (error: any) {
      // Manejo de errores específicos
      if (error.name === "UsernameExistsException") {
        throw new Error("The username is already taken.");
      }
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  private mapRoleToGroupName(role: string): string {
    switch (role) {
      case "ADMIN":
        return "users-admin-group";
      case "DRIVER":
        return "users-driver-group";
      default:
        throw new Error(`Unknown role: ${role}`);
    }
  }
}
