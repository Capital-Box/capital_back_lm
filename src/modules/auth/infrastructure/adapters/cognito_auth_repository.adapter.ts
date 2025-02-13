import {
  AdminCreateUserCommand,
  AdminInitiateAuthCommand,
  AdminSetUserPasswordCommand,
  CognitoIdentityProviderClient,
  RevokeTokenCommand,
  AdminUpdateUserAttributesCommand,
  AdminDeleteUserCommand,
  ListUsersCommand,
} from '@aws-sdk/client-cognito-identity-provider';

import { TokenDTO } from 'modules/auth/application/dtos/token.dto';
import { CreateAuthDTO } from '../dtos/request/create_auth.dto';
import { AuthRepositoryPort } from '../ports/auth_repository.port';
import { UpdateAuthDTO } from '../dtos/request/update_auth.dto';
import { DeleteAuthDTO } from '../dtos/request/delete_auth.dto';

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

  async authenticate(email: string, password: string): Promise<TokenDTO> {
    // 1. Look up the user by email
    let username: string | undefined;
    try {
      const listUsersCommand = new ListUsersCommand({
        UserPoolId: this.userPoolId,
        Filter: `email = "${email}"`,
        Limit: 1,
      });

      const listUsersResponse = await this.cognitoClient.send(listUsersCommand);

      if (!listUsersResponse.Users || listUsersResponse.Users.length === 0) {
        throw new Error('User not found');
      }

      const user = listUsersResponse.Users[0];
      username = user.Username;

      if (!username) {
        throw new Error('Invalid credentials'); // Or handle the missing username case
      }
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
        console.error('Error during AdminInitiateAuthCommand:', error);
        // Re-throw the error to be handled upstream
        throw error;
      }
    } catch (error: any) {
      console.error('Error in authenticate method:', error);
      if (error.message === 'User not found') {
        throw error; // Re-throw the "User not found" error
      }
      // If it's another error during user listing, throw a generic authentication error
      throw new Error('Authentication failed');
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
      console.error('Error during refresh:', error);
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
      console.error('Error during logout:', error);
      throw new Error('Error on logout');
    }
  }

  async save(user: CreateAuthDTO): Promise<void> {
    try {
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
      console.error('Error during changePassword:', error);
      throw new Error('Error on change password');
    }
  }

  async update(user: UpdateAuthDTO): Promise<void> {
    try {
      const data = user.getData().attributes;
      const newUser = {
        Username: data.username,
        UserAttributes: [
          {
            Name: 'email',
            Value: data.email,
          },
          {
            Name: 'custom:custom:role',
            Value: data.role,
          },
        ],
      };
      await this.cognitoClient.send(
        new AdminUpdateUserAttributesCommand({
          UserPoolId: this.userPoolId!,
          Username: newUser.Username,
          UserAttributes: newUser.UserAttributes,
        }),
      );
      if (data.password) {
        await this.changePassword(data.username, data.password);
      }
    } catch (error: any) {
      console.error('Error updating user in Cognito:', error);
      throw new Error('Error on update user');
    }
  }

  async delete(user: DeleteAuthDTO): Promise<void> {
    try {
      const data = user.getData().attributes;
      await this.cognitoClient.send(
        new AdminDeleteUserCommand({
          UserPoolId: this.userPoolId!,
          Username: data.username,
        }),
      );
    } catch (error: any) {
      console.error('Error deleting user in Cognito:', error);
      throw new Error('Error on delete user');
    }
  }
}
