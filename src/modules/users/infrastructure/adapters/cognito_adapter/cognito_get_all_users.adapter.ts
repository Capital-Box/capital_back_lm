import {
    CognitoIdentityProviderClient,
    ListUsersCommand,
  } from "@aws-sdk/client-cognito-identity-provider";
  import { CognitoGetAllUsersPort } from "../../ports/cognito_get_all_users.port";
  import { GetAllUsersResponseDTO } from "../../dtos/get_all_users.dto";
  
  export class CognitoGetAllUsersAdapter implements CognitoGetAllUsersPort {
    private cognitoClient: CognitoIdentityProviderClient;
  
    constructor(private readonly userPoolId: string) {
      this.cognitoClient = new CognitoIdentityProviderClient({});
    }
  
    async handle(): Promise<GetAllUsersResponseDTO> {
      try {
        const command = new ListUsersCommand({
          UserPoolId: this.userPoolId,
        });
  
        const response = await this.cognitoClient.send(command);
  
        const users = response.Users?.map((user) => ({
          username: user.Username || "",
          attributes: user.Attributes?.reduce(
            (acc, attr) => ({
              ...acc,
              [attr.Name || ""]: attr.Value || "",
            }),
            {}
          ) || {},
        })) || [];
  
        return new GetAllUsersResponseDTO(users);
      } catch (error: any) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      }
    }
  }
  