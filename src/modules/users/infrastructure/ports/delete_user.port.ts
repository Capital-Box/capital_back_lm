import { RequestDTO } from "@lib/infrastructure/dtos/requests/request.dto";
import { Handler } from "@lib/infrastructure/types/handler";
import { ResponseDTO } from "@lib/infrastructure/dtos/responses/response.dto";
import { DeleteUserRequestDTO } from "../dtos/requests/delete_user_request.dto";

export interface DeleteUserPort {
  deleteUser: Handler<DeleteUserRequestDTO, ResponseDTO<Object>>;
}
