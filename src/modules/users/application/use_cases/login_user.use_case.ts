import { LoginUserResponseDTO, LoginUserRequestDTO } from '../../infrastructure/dtos/login_user.dto';
import { CognitoAuthAdapter } from '../../infrastructure/adapters/cognito_auth.adapter';
import { IUseCase } from '../../../../lib/application/interfaces/use_case.interface';
import { ResponseDTO } from '../../../../lib/infrastructure/dtos/response.dto';
import { RequestDTO } from '../../../../lib/infrastructure/dtos/request.dto';


export class LoginUserUseCase implements IUseCase<LoginUserRequestDTO, Promise<LoginUserResponseDTO>> {
    constructor(private readonly cognitoAdapter: CognitoAuthAdapter) {}

    async invoke(input: LoginUserRequestDTO ): Promise<LoginUserResponseDTO> {
        const token = await this.cognitoAdapter.login(input.username, input.password);
        return new LoginUserResponseDTO(token.accessToken, token.refreshToken, token.idToken);        
    }
}
