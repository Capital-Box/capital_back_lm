import { ResponseDTO } from "@lib/infrastructure/dtos/responses/response.dto";
import { Handler } from "@lib/infrastructure/types/handler";
import { DeleteUserRequestDTO } from "../dtos/requests/delete_user_request.dto";

export interface DeleteUserPort {
  deleteUser: Handler<DeleteUserRequestDTO, ResponseDTO<Object>>;
}
