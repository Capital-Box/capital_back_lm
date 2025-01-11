import {
    AdminInitiateAuthCommand,
    CognitoIdentityProviderClient
} from "@aws-sdk/client-cognito-identity-provider";
import { CognitoLoginPort } from "../../ports/cognito_login.port";
import { LoginUserRequestDTO, LoginUserResponseDTO } from "../../dtos/login_user.dto";

export class CognitoLoginAdapter implements CognitoLoginPort {
  private cognitoClient: CognitoIdentityProviderClient;

  constructor(private readonly userPoolId: string, private readonly clientId: string) {
      this.cognitoClient = new CognitoIdentityProviderClient({});
  }

  async handle(user: LoginUserRequestDTO): Promise<LoginUserResponseDTO> {
      const command = new AdminInitiateAuthCommand({
          UserPoolId: this.userPoolId,
          ClientId: this.clientId,
          AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
          AuthParameters: {
              USERNAME: user.username,
              PASSWORD: user.password,
          },
      });

      const response = await this.cognitoClient.send(command);

      if (!response.AuthenticationResult) {
          throw new Error("Login failed: No authentication result received.");
      }

      return {
          accessToken: response.AuthenticationResult.AccessToken || "",
          refreshToken: response.AuthenticationResult.RefreshToken || "",
          idToken: response.AuthenticationResult.IdToken || "",
      };
  }

}


// async register(username: string, password: string, email: string): Promise<void> {
//     const command = new AdminCreateUserCommand({
//         UserPoolId: this.userPoolId,
//         Username: username,
//         UserAttributes: [{ Name: "email", Value: email }],
//         TemporaryPassword: password,
//     });

//     await this.cognitoClient.send(command);
// }


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
