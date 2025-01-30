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
import { ListUsersCase } from "modules/users/application/use_cases/list_users.case";
import { DeleteUserResponseDTO } from "../dtos/responses/delete_user_response.dto";
import { UserListResponseDTO } from "../dtos/responses/user_list_response.dto";

interface UserApiGatewayAdapterDependencies {
  service: CreateUserCase & UpdateUserCase & DeleteUserCase & ListUsersCase;
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
        id: userDTO.getId(),
        type: "user",
        attributes: {
          email: userDTO.getEmail(),
          name: userDTO.getName(),
          role: userDTO.getRole(),
          city: userDTO.getCity(),
        },
      },
    });
    return response;
  }

  async updateUser(req: UpdateUserRequestDTO): Promise<UserResponseDTO> {
    req.validatePayload();
    req.validateParameters();
    const reqPayload = req.getPayload().attributes;
    const updateUserDTO = new UpdateUserDTO(reqPayload);
    const userDTO = await this.dependencies.service.update(updateUserDTO);
    const response = new UserResponseDTO({
      status: HttpStatus.OK,
      payload: {
        id: userDTO.getEmail(),
        type: "update",
        attributes: userDTO.toObject(),
      },
    });
    return response;
  }

  async deleteUser(req: DeleteUserRequestDTO): Promise<DeleteUserResponseDTO> {
    try {
      req.validateParameters();
      const userId = req.getUserId();
      await this.dependencies.service.delete(userId);
      return new DeleteUserResponseDTO(userId);
    } catch (error: any) {
      return new DeleteUserResponseDTO("Error deleting User");
    }
  }

  async listUsers(): Promise<UserListResponseDTO> {
    const userDTOs = await this.dependencies.service.list();
    return new UserListResponseDTO(userDTOs);
  }
}
