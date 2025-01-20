import {
  AdminCreateUserCommand,
  AdminDisableUserCommand,
  AdminSetUserPasswordCommand,
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import { User } from "modules/users/domain/entities/user.entity";
import { UserRepositoryPort } from "../ports/user_repository.port";
import { IResponse } from "@lib/infrastructure/dtos/responses/response.dto";

interface CognitoUserRepositoryDependencies {
  userPoolId: string;
  clientId: string;
}

export class CognitoUserRepository implements UserRepositoryPort {
  private readonly userPoolId: string;
  private readonly clientId: string;

  constructor(
    dependencies: CognitoUserRepositoryDependencies,
    private readonly cognitoClient: CognitoIdentityProviderClient = new CognitoIdentityProviderClient()
  ) {
    this.userPoolId = dependencies.userPoolId;
    this.clientId = dependencies.clientId;
  }

  async save(user: User): Promise<User> {
    try {
      const createUserCommand = new AdminCreateUserCommand({
        UserPoolId: this.userPoolId,
        Username: user.getEmail(),
        TemporaryPassword: user.getPassword(),
        UserAttributes: [
          { Name: "email", Value: user.getEmail() },
          { Name: "email_verified", Value: "true" },
          { Name: "name", Value: user.getUserName() },
          { Name: "custom:role", Value: user.getRole() },
          { Name: "custom:city", Value: user.getCity() },
        ],
        MessageAction: "SUPPRESS",
      });
      await this.cognitoClient.send(createUserCommand);

      const setPasswordCommand = new AdminSetUserPasswordCommand({
        UserPoolId: this.userPoolId,
        Username: user.getEmail(),
        Password: user.getPassword(),
        Permanent: true,
      });
      await this.cognitoClient.send(setPasswordCommand);

      return user;
    } catch (error: any) {
      if (error.name === "UsernameExistsException") {
        throw new Error("The username is already taken.");
      }
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  async update(user: User): Promise<User> {
    try {
      const updateCommand = new AdminUpdateUserAttributesCommand({
        UserPoolId: this.userPoolId,
        Username: user.getEmail(),
        UserAttributes: [
          { Name: "email", Value: user.getEmail() },
          { Name: "name", Value: user.getUserName() },
          { Name: "custom:role", Value: user.getRole() },
          { Name: "custom:city", Value: user.getCity() },
        ],
      });
      await this.cognitoClient.send(updateCommand);

      if (user.getPassword()) {
        const setPasswordCommand = new AdminSetUserPasswordCommand({
          UserPoolId: this.userPoolId,
          Username: user.getEmail(),
          Password: user.getPassword(),
          Permanent: true,
        });
        await this.cognitoClient.send(setPasswordCommand);
      }

      return user;
    } catch (error: any) {
      throw new Error(`Update failed: ${error.message}`);
    }
  }

  async delete(userId: string): Promise<void> {
    const disableCommand = new AdminDisableUserCommand({
      UserPoolId: this.userPoolId,
      Username: userId,
    });
    await this.cognitoClient.send(disableCommand);

    const updateCommand = new AdminUpdateUserAttributesCommand({
      UserPoolId: this.userPoolId,
      Username: userId,
      UserAttributes: [
        {
          Name: "custom:isDeleted",
          Value: "true"
        }
      ],
    });
    await this.cognitoClient.send(updateCommand);
  }

  async findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async list(): Promise<User[]> {
    try {
      // 1. Ejecutar AdminListUsers para traer la lista del pool
      const command = new AdminListUsersCommand({
        UserPoolId: this.userPoolId,
        // Podrías usar Pagination, Filters, etc.
      });

      const response = await this.cognitoClient.send(command);
      const cognitoUsers = response.Users || [];

      // 2. Mapear la respuesta a un array de entidades User
      const domainUsers: User[] = cognitoUsers.map((cUser) => {
        // Extraer los atributos relevantes
        // Por ejemplo, "email", "custom:role", "custom:city", "name", etc.

        const email = cUser.Attributes?.find((attr) => attr.Name === "email")?.Value ?? "";
        const name = cUser.Attributes?.find((attr) => attr.Name === "name")?.Value ?? "";
        const role = cUser.Attributes?.find((attr) => attr.Name === "custom:role")?.Value ?? "";
        const city = cUser.Attributes?.find((attr) => attr.Name === "custom:city")?.Value ?? "";
        
        // Password no se puede recuperar directamente de Cognito, 
        // así que podrías setearla como vacía si tu dominio la requiere
        // o ajustarla según tu lógica
        const password = "";

        // De acuerdo a tu UserFactory, 
        // construimos un CreateUserDTO-like o su interfaz
        // y generamos la entidad.
        const userEntity = UserFactory.create({
          username: name,     // O cUser.Username
          password: password,
          email: email,
          role: role,
          city: city,
        });
        
        return userEntity;
      });

      return domainUsers;
    } catch (error: any) {
      throw new Error("Error listing users from Cognito: " + error.message);
    }
  }
}
