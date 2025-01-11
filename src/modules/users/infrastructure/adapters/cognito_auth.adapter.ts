import {
    AdminCreateUserCommand,
    AdminInitiateAuthCommand,
    CognitoIdentityProviderClient
} from "@aws-sdk/client-cognito-identity-provider";

export class CognitoAuthAdapter {
  private cognitoClient: CognitoIdentityProviderClient;

  constructor(private readonly userPoolId: string, private readonly clientId: string) {
      this.cognitoClient = new CognitoIdentityProviderClient({});
  }

  async login(username: string, password: string): Promise<{
      accessToken: string;
      refreshToken: string;
      idToken: string;
  }> {
      const command = new AdminInitiateAuthCommand({
          UserPoolId: this.userPoolId,
          ClientId: this.clientId,
          AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
          AuthParameters: {
              USERNAME: username,
              PASSWORD: password,
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

  async register(username: string, password: string, email: string): Promise<void> {
      const command = new AdminCreateUserCommand({
          UserPoolId: this.userPoolId,
          Username: username,
          UserAttributes: [{ Name: "email", Value: email }],
          TemporaryPassword: password,
      });

      await this.cognitoClient.send(command);
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; idToken: string }> {
      const command = new AdminInitiateAuthCommand({
          UserPoolId: this.userPoolId,
          ClientId: this.clientId,
          AuthFlow: "REFRESH_TOKEN_AUTH",
          AuthParameters: {
              REFRESH_TOKEN: refreshToken,
          },
      });

      const response = await this.cognitoClient.send(command);

      if (!response.AuthenticationResult) {
          throw new Error("Token refresh failed: No authentication result received.");
      }

      return {
          accessToken: response.AuthenticationResult.AccessToken || "",
          idToken: response.AuthenticationResult.IdToken || "",
      };
  }
}
