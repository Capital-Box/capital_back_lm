import { CreateUserDTO } from "modules/users/application/dtos/create_user.dto";
import { UpdateUserDTO } from "modules/users/application/dtos/update_user.dto";
import { CreateUserCase } from "modules/users/application/use_cases/create_user.case";
import { UpdateUserCase } from "modules/users/application/use_cases/update_user.case";
import { RegisterUserRequestDTO } from "../dtos/requests/register_user_request.dto";
import { UpdateUserRequestDTO } from "../dtos/requests/update_user_request.dto";
import { UserResponseDTO } from "../dtos/responses/user_response.dto";
import { CreateUserPort } from "../ports/create_user.port";
import { UpdateUserPort } from "../ports/update_user.port";
import { HttpStatus } from "@lib/infrastructure/enums/http_status.enum";
import { DeleteUserRequestDTO } from "../dtos/requests/delete_user_request.dto";
import { DeleteUserCase } from "modules/users/application/use_cases/delete_user.case";
import {
  IResponse,
  ResponseDTO,
} from "@lib/infrastructure/dtos/responses/response.dto";

interface UserApiGatewayAdapterDependencies {
  service: CreateUserCase & UpdateUserCase & DeleteUserCase;
}

export class UserApiGatewayAdapter implements CreateUserPort, UpdateUserPort {
  constructor(
    private readonly dependencies: UserApiGatewayAdapterDependencies
  ) {}

  async createUser(req: RegisterUserRequestDTO): Promise<UserResponseDTO> {
    req.validatePayload();
    const reqPayload = req.getPayload();
    const createUserDTO: CreateUserDTO = new CreateUserDTO(
      reqPayload.attributes
    );
    const userDTO = await this.dependencies.service.create(createUserDTO);
    const response = new UserResponseDTO({
      status: HttpStatus.CREATED,
      payload: {
        id: userDTO.email,
        type: "user",
        attributes: userDTO,
      },
    });
    return response;
  }

  async updateUser(req: UpdateUserRequestDTO): Promise<UserResponseDTO> {
    req.validatePayload();
    const reqPayload = req.getPayload().attributes;
    const updateUserDTO = new UpdateUserDTO(reqPayload);
    const userDTO = await this.dependencies.service.update(updateUserDTO);
    const response = new UserResponseDTO({
      status: HttpStatus.OK,
      payload: {
        id: userDTO.email,
        type: "update",
        attributes: userDTO,
      },
    });
    return response;
  }

  // Chequear que este ok
  async deleteUser(req: DeleteUserRequestDTO): Promise<IResponse<Object>> {
    req.validatePayload();
    const userId = req.getUserId();
    const deleteUser: Object = await this.dependencies.service.delete(userId);
    const response = {
      status: HttpStatus.NO_CONTENT,
      payload: {
        id: userId,
        type: "delete",
        attributes: {
          message: "User deleted successfully",
        },
      },
    };
    return response;
  }
}
