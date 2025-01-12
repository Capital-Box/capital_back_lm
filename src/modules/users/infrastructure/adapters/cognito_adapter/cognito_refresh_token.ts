import {
    AdminInitiateAuthCommand,
    CognitoIdentityProviderClient,
  } from "@aws-sdk/client-cognito-identity-provider";
  import {
    RefreshUserTokenRequestDTO,
    RefreshUserTokenResponseDTO,
  } from "../../dtos/refresh_token_user.dto";
import { CognitoRefreshTokenPort } from "../../ports/cognito_refresh_token.port";
  
  export class CognitoRefreshTokenAdapter implements CognitoRefreshTokenPort {
    private cognitoClient: CognitoIdentityProviderClient;
  
    constructor(private readonly userPoolId: string, private readonly clientId: string) {
      this.cognitoClient = new CognitoIdentityProviderClient({});
    }
  
    async handle(input: RefreshUserTokenRequestDTO): Promise<RefreshUserTokenResponseDTO> {
      const { refreshToken } = input;
  
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
  
        if (!response.AuthenticationResult) {
          throw new Error("Failed to refresh tokens");
        }
  
        return new RefreshUserTokenResponseDTO(
          response.AuthenticationResult.AccessToken || "",
          response.AuthenticationResult.IdToken || "",
          refreshToken
        );
      } catch (error: any) {
        throw new Error(`Refresh token failed: ${error.message}`);
      }
    }
  }
  