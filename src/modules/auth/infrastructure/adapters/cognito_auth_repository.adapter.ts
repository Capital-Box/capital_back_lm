import {
  AdminInitiateAuthCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

import { AuthRepositoryPort } from "../ports/auth_repository.port";
import { TokenDTO } from "modules/auth/application/dtos/token.dto";

interface CognitoAuthRepositoryDependencies {
  userPoolId: string;
  clientId: string;
}

export class CognitoAuthRepository implements AuthRepositoryPort {
  private userPoolId: string;
  private clientId: string;

  constructor(
    dependencies: CognitoAuthRepositoryDependencies,
    private readonly cognitoClient: CognitoIdentityProviderClient = new CognitoIdentityProviderClient()
  ) {
    this.userPoolId = dependencies.userPoolId;
    this.clientId = dependencies.clientId;
  }

  async authenticate(username: string, password: string): Promise<TokenDTO> {
    try {
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
      const accessToken = response.AuthenticationResult?.IdToken ?? "";
      const refreshToken = response.AuthenticationResult?.RefreshToken ?? "";

      const token = new TokenDTO({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      return new TokenDTO(token);
    } catch (error: any) {
      throw new Error("Invalid credentials");
    }
  }

  async refresh(refreshToken: string): Promise<TokenDTO> {
    try {
      const command = new AdminInitiateAuthCommand({
        UserPoolId: this.userPoolId,
        ClientId: this.clientId,
        AuthFlow: "REFRESH_TOKEN_AUTH",
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
        },
      });

      const response = await this.cognitoClient.send(command);
      const accessToken = response.AuthenticationResult?.IdToken ?? "";
      const newRefreshToken =
        response.AuthenticationResult?.RefreshToken ?? refreshToken;

      const token = new TokenDTO({
        access_token: accessToken,
        refresh_token: newRefreshToken,
      });

      return new TokenDTO(token);
    } catch (error: any) {
      throw new Error("Refresh token invalid");
    }
  }

  // async logout(refreshToken: string): Promise<void> {
  //   try {
  //     const command = new AdminInitiateAuthCommand({
  //       UserPoolId: this.userPoolId,
  //       ClientId: this.clientId,
  //       AuthFlow: 
}
