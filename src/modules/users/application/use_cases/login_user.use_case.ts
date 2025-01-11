import { IUseCase } from '../../../../lib/application/interfaces/use_case.interface';
import { CognitoLoginAdapter } from '../../infrastructure/adapters/cognito_adapter/cognito_login.adapter';
import { LoginUserRequestDTO, LoginUserResponseDTO } from '../../infrastructure/dtos/login_user.dto';


export class LoginUserUseCase implements IUseCase<LoginUserRequestDTO, Promise<LoginUserResponseDTO>> {
    constructor(private readonly cognitoLoginAdapter: CognitoLoginAdapter) {}

    async invoke(input: LoginUserRequestDTO): Promise<LoginUserResponseDTO> {
        const token = await this.cognitoLoginAdapter.handle(input);
        return new LoginUserResponseDTO(token.accessToken, token.refreshToken, token.idToken);        
    }
}
