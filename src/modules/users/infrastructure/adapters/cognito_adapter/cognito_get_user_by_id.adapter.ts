import {
    AdminGetUserCommand,
    CognitoIdentityProviderClient,
  } from "@aws-sdk/client-cognito-identity-provider";
  import { CognitoGetUserByIdPort } from "../../ports/cognito_get_user_by_id.port";
  import {
    GetUserByIdRequestDTO,
    GetUserByIdResponseDTO,
  } from "../../dtos/get_user_by_id.dto";
  
  export class CognitoGetUserByIdAdapter implements CognitoGetUserByIdPort {
    private cognitoClient: CognitoIdentityProviderClient;
  
    constructor(private readonly userPoolId: string) {
      this.cognitoClient = new CognitoIdentityProviderClient({});
    }
  
    async handle(input: GetUserByIdRequestDTO): Promise<GetUserByIdResponseDTO> {
      const { username } = input;
  
      try {
        const command = new AdminGetUserCommand({
          UserPoolId: this.userPoolId,
          Username: username,
        });
  
        const response = await this.cognitoClient.send(command);
  
        const attributes = response.UserAttributes?.reduce(
          (acc, attr) => ({ ...acc, [attr.Name as string]: attr.Value }),
          {}
        );
  
        return new GetUserByIdResponseDTO(username, attributes || {});
      } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
      }
    }
  }
  