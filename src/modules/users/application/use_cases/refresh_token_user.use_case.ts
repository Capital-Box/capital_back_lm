import { IUseCase } from "../../../../lib/application/interfaces/use_case.interface";
import { CognitoRefreshTokenAdapter } from "../../infrastructure/adapters/cognito_adapter/cognito_refresh_token";
import {
  RefreshUserTokenRequestDTO,
  RefreshUserTokenResponseDTO,
} from "../../infrastructure/dtos/refresh_token_user.dto";

export class RefreshUserTokenUseCase
  implements
    IUseCase<RefreshUserTokenRequestDTO, Promise<RefreshUserTokenResponseDTO>>
{
  constructor(private readonly cognitoAdapter: CognitoRefreshTokenAdapter) {}

  async invoke(
    input: RefreshUserTokenRequestDTO
  ): Promise<RefreshUserTokenResponseDTO> {
    return this.cognitoAdapter.handle(input);
  }
}
