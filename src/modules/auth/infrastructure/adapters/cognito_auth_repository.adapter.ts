import {
  AdminCreateUserCommand,
  AdminInitiateAuthCommand,
  AdminSetUserPasswordCommand,
  CognitoIdentityProviderClient,
  RevokeTokenCommand,
} from '@aws-sdk/client-cognito-identity-provider';

import { AuthRepositoryPort } from '../ports/auth_repository.port';
import { TokenDTO } from 'modules/auth/application/dtos/token.dto';
import { User } from 'modules/users/domain/entities/user.entity';
import { CreateUserDTO } from 'modules/users/application/dtos/create_user.dto';
import { CreateAuthDTO } from '../dtos/request/create_auth.dto';

interface CognitoAuthRepositoryDependencies {
  userPoolId: string;
  clientId: string;
}

export class CognitoAuthRepository implements AuthRepositoryPort {
  private userPoolId: string;
  private clientId: string;

  constructor(
    dependencies: CognitoAuthRepositoryDependencies,
    private readonly cognitoClient: CognitoIdentityProviderClient = new CognitoIdentityProviderClient(),
  ) {
    this.userPoolId = dependencies.userPoolId;
    this.clientId = dependencies.clientId;
  }

  async authenticate(username: string, password: string): Promise<TokenDTO> {
    try {
      const command = new AdminInitiateAuthCommand({
        UserPoolId: this.userPoolId,
        ClientId: this.clientId,
        AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
        },
      });

      const response = await this.cognitoClient.send(command);
      const accessToken = response.AuthenticationResult?.IdToken ?? '';
      const refreshToken = response.AuthenticationResult?.RefreshToken ?? '';

      const token = new TokenDTO({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      return new TokenDTO(token);
    } catch (error: any) {
      throw new Error('Invalid credentials');
    }
  }

  async refresh(refreshToken: string): Promise<TokenDTO> {
    try {
      const command = new AdminInitiateAuthCommand({
        UserPoolId: this.userPoolId,
        ClientId: this.clientId,
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
        },
      });

      const response = await this.cognitoClient.send(command);
      const accessToken = response.AuthenticationResult?.IdToken ?? '';
      const newRefreshToken =
        response.AuthenticationResult?.RefreshToken ?? refreshToken;

      const token = new TokenDTO({
        access_token: accessToken,
        refresh_token: newRefreshToken,
      });

      return new TokenDTO(token);
    } catch (error: any) {
      throw new Error('Refresh token invalid');
    }
  }

  async logout(refreshToken: string): Promise<void> {
    try {
      const command = new RevokeTokenCommand({
        Token: refreshToken,
        ClientId: this.clientId,
      });
      await this.cognitoClient.send(command);
    } catch (error: any) {
      throw new Error('Error on logout');
    }
  }

  async save(user: CreateAuthDTO): Promise<void> {
    try {
      console.log('userpoolid', this.userPoolId);
      console.log('clientId', this.clientId);
      console.log(user);
      const data = user.getData().attributes;
      const newUser = {
        Username: data.username,
        Password: data.password,
        UserAttributes: [
          {
            Name: 'email',
            Value: data.email,
          },
          {
            Name: 'email_verified',
            Value: 'true',
          },
          {
            Name: 'custom:role',
            Value: data.role,
          },
        ],
      };
      try {
        await this.cognitoClient.send(
          new AdminCreateUserCommand({
            UserPoolId: this.userPoolId!,
            Username: newUser.Username,
            TemporaryPassword: newUser.Password,
            UserAttributes: newUser.UserAttributes,
          }),
        );
      } catch (error: any) {
        console.error('Error creating user in Cognito:', error);
        throw new Error(`Error creating user: ${error.message}`);
      }
      try {
        await this.changePassword(data.username, data.password);
      } catch (error: any) {
        console.error('Error setting permanent password in Cognito:', error);
        throw new Error(`Error setting permanent password: ${error.message}`);
      }
    } catch (error: any) {
      console.error('Error in save method:', error);
      throw new Error(`Error on save user: ${error.message}`);
    }
  }

  async changePassword(username: string, password: string): Promise<void> {
    try {
      await this.cognitoClient.send(
        new AdminSetUserPasswordCommand({
          UserPoolId: this.userPoolId,
          Username: username,
          Password: password,
          Permanent: true,
        }),
      );
    } catch (error: any) {
      throw new Error('Error on change password');
    }
  }
}
