import { Handler } from "@lib/infrastructure/types/handler";
import { UpdateUserRequestDTO } from "../dtos/requests/update_user_request.dto";
import { UserResponseDTO } from "../dtos/responses/user_response.dto";

export interface UpdateUserPort {
  updateUser: Handler<UpdateUserRequestDTO, UserResponseDTO>;
}
