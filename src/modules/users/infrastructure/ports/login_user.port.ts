import { Handler } from "@lib/infrastructure/types/handler";
import { LoginUserRequestDTO } from "../dtos/requests/login_user_request.dto";
import { LoginUserResponseDTO } from "../dtos/responses/login_user_response.dto";

export interface LoginUserPort {
  loginUser: Handler<LoginUserRequestDTO, LoginUserResponseDTO>;
}
