// import { IUseCase } from '../../../../lib/application/interfaces/use_case.interface';



// export class RefreshUserTokenUseCase implements IUseCase<RefreshUserTokenRequestDTO, Promise<RefreshUserTokenResponseDTO>> {
//     constructor(private readonly cognitoAdapter: CognitoAuthAdapter) {}

//     async invoke(input: RefreshUserTokenRequestDTO ): Promise<RefreshUserTokenResponseDTO> {
//         const token = await this.cognitoAdapter.refreshToken(input.refreshToken);
//         return new RefreshUserTokenResponseDTO(token.accessToken, token.refreshToken, token.idToken);        
//     }
// }
