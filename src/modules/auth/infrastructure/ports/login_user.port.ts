import { Handler } from "@lib/infrastructure/types/handler";
import { LoginRequestDTO } from "../dtos/request/login_request.dto";
import { LoginResponseDTO } from "../dtos/response/login_response.dto";

export interface LoginUserPort {
  loginUser: Handler<LoginRequestDTO, LoginResponseDTO>;
}
