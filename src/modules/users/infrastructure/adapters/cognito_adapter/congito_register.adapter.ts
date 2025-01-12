import {
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
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
    const { name, password, email, attributes, role } = input;

    if (!name || !email || !password) {
      throw new Error("Username, email, and password are required.");
    }

    try {
      const createUserCommand = new AdminCreateUserCommand({
        UserPoolId: this.userPoolId,
        Username: email,
        TemporaryPassword: password,
        UserAttributes: [
          { Name: "email", Value: email },
          { Name: "email_verified", Value: "true" },
          { Name: "name", Value: name },
          ...(attributes
            ? Object.entries(attributes).map(([Name, Value]) => ({
                Name,
                Value,
              }))
            : []),
        ],
      });
      
      const createUserResponse = await this.cognitoClient.send(createUserCommand);

      // Agregar al grupo si se proporciona un rol
      if (role) {
        const groupName = this.mapRoleToGroupName(role);
        const addGroupCommand = new AdminAddUserToGroupCommand({
          UserPoolId: this.userPoolId,
          Username: email,
          GroupName: groupName 
        });
        await this.cognitoClient.send(addGroupCommand);
      }

      // Retornar información del usuario creado
      const userId =
        createUserResponse.User?.Attributes?.find(
          (attr) => attr.Name === "sub"
        )?.Value || "";

      return new RegisterUserResponseDTO(
        userId,
        createUserResponse.User?.Username || ""
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
