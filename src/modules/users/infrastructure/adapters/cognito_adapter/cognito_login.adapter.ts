import {
  AdminInitiateAuthCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import { CognitoLoginPort } from "../../ports/cognito_login.port";
import {
  LoginUserRequestDTO,
  LoginUserResponseDTO,
} from "../../dtos/login_user.dto";

export class CognitoLoginAdapter implements CognitoLoginPort {
  private cognitoClient: CognitoIdentityProviderClient;

  constructor(
    private readonly userPoolId: string,
    private readonly clientId: string
  ) {
    this.cognitoClient = new CognitoIdentityProviderClient({});
  }

  async handle(input: LoginUserRequestDTO): Promise<LoginUserResponseDTO> {
    const { email, password } = input;

    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    try {
      const command = new AdminInitiateAuthCommand({
        UserPoolId: this.userPoolId,
        ClientId: this.clientId,
        AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      });

      const response = await this.cognitoClient.send(command);

      console.log(response);

      if (!response.AuthenticationResult) {
        throw new Error("Login failed.");
      }

     return new LoginUserResponseDTO(
       response.AuthenticationResult.AccessToken || "",
       response.AuthenticationResult.RefreshToken || "",
       response.AuthenticationResult.IdToken || "",
     )
    } catch (error: any) {
      if (error.name === "NotAuthorizedException") {
        throw new Error("Invalid email or password.");
      }
      if (error.name === "UserNotFoundException") {
        throw new Error("User does not exist.");
      }
      throw new Error(`Login failed: ${error.message}`);
    }
  }
}

// async refreshToken(refreshToken: string): Promise<{ accessToken: string; idToken: string }> {
//     const command = new AdminInitiateAuthCommand({
//         UserPoolId: this.userPoolId,
//         ClientId: this.clientId,
//         AuthFlow: "REFRESH_TOKEN_AUTH",
//         AuthParameters: {
//             REFRESH_TOKEN: refreshToken,
//         },
//     });

//     const response = await this.cognitoClient.send(command);

//     if (!response.AuthenticationResult) {
//         throw new Error("Token refresh failed: No authentication result received.");
//     }

//     return {
//         accessToken: response.AuthenticationResult.AccessToken || "",
//         idToken: response.AuthenticationResult.IdToken || "",
//     };
// }
