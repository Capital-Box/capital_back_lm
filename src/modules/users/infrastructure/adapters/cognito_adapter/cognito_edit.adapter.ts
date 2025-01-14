import {
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import { CognitoEditPort } from "../../ports/cognito_edit.port";
import { EditUserRequestDTO, EditUserResponseDTO } from "../../dtos/edit_user.dto";

export class CognitoEditAdapter implements CognitoEditPort {
  private cognitoClient: CognitoIdentityProviderClient;

  constructor(private readonly userPoolId: string) {
    this.cognitoClient = new CognitoIdentityProviderClient({});
  }

  async handle(input: EditUserRequestDTO): Promise<EditUserResponseDTO> {
    const { username, attributes, role, isDeleted } = input;

    if (!username) {
      throw new Error("Username is required.");
    }

    // Construct UserAttributes array
    const userAttributes = [];

    // Handle isDeleted flag
    if (typeof isDeleted !== "undefined") {
      userAttributes.push({ Name: "custom:isDeleted", Value: isDeleted ? "true" : "false" });
    }

    // Add or change role if provided
    if (role) {
      userAttributes.push({ Name: "custom:role", Value: role });
    }

    // Add other attributes
    if (attributes) {
      userAttributes.push(
        ...Object.entries(attributes).map(([Name, Value]) => ({
          Name,
          Value,
        }))
      );
    }

    try {
      // Send update request to Cognito
      const command = new AdminUpdateUserAttributesCommand({
        UserPoolId: this.userPoolId,
        Username: username,
        UserAttributes: userAttributes,
      });

      await this.cognitoClient.send(command);

      const successMessage = isDeleted
        ? "User deleted successfully."
        : "User updated successfully.";

      return new EditUserResponseDTO(username, successMessage);
    } catch (error: any) {
      const errorAction = isDeleted ? "delete" : "edit";
      throw new Error(`${errorAction} failed: ${error.message}`);
    }
  }
}
