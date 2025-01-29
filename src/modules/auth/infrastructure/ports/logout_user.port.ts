import { Handler } from "@lib/infrastructure/types/handler";
import { LogOutResponseDTO } from "../dtos/response/logout_response.dto";
import { logOutRequestDTO } from "../dtos/request/logout_request.dto";

export interface LogoutPort {
  logout: Handler<logOutRequestDTO, LogOutResponseDTO>;
}
