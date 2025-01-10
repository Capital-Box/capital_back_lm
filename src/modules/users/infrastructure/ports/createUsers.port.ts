import { RequestDTO } from "../../../../lib/infrastructure/dtos/request.dto";
import { ResponseDTO } from "../../../../lib/infrastructure/dtos/response.dto";
import CreateUserDTO from "../dtos/createUsers.dto";
import UserDTO from "../dtos/user.dto";

export interface CreateUserPort {
    register(user: RequestDTO): Promise<ResponseDTO>;
    }