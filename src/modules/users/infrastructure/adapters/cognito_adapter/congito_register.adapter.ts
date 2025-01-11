import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { RegisterUserRequestDTO, RegisterUserResponseDTO } from "../dtos/register_user.dto";
import { CognitoRegisterPort } from "../ports/cognito_register.port";






export class CognitoRegisterAdapter implements CognitoRegisterPort {
    private cognitoClient: CognitoIdentityProviderClient;

    constructor(private readonly userPoolId: string, private readonly clientId: string) {
        this.cognitoClient = new CognitoIdentityProviderClient({});
    }
    
    async handle(input: RegisterUserRequestDTO): Promise<RegisterUserResponseDTO> {
        
        // chequear logica de registro
        return {
            access_token:  "",
            id_token:  "",
        };
    }

}