import { Handler } from "@lib/infrastructure/types/handler";
import { RefreshTokenRequestDTO } from "../dtos/request/refresh_token_request.dto";
import { RefreshTokenResponseDTO } from '../dtos/response/refresh_token.response.dto';

export interface RefreshTokenPort {
    refreshToken(): Handler<RefreshTokenRequestDTO, RefreshTokenResponseDTO>;
    }