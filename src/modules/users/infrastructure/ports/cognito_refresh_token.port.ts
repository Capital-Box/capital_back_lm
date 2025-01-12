import { InputPort } from '../../../../lib/infrastructure/ports/inputs/input.port';
import { RefreshUserTokenRequestDTO, RefreshUserTokenResponseDTO } from '../dtos/refresh_token_user.dto';

export interface CognitoRefreshTokenPort extends InputPort <RefreshUserTokenRequestDTO, RefreshUserTokenResponseDTO> {
  handle(input: RefreshUserTokenRequestDTO): Promise<RefreshUserTokenResponseDTO>;
}
