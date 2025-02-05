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
import { Exception } from "@lib/shared/exceptions/exception";
import { UnexpectedException } from "@lib/shared/exceptions/unexpected.exception";
import { ValidationException } from "@lib/shared/exceptions/validation.exception";

interface UserApiGatewayAdapterDependencies {
  service: CreateUserCase & UpdateUserCase & DeleteUserCase & ListUsersCase;
}

export class UserApiGatewayAdapter implements CreateUserPort, UpdateUserPort {
  constructor(
    private readonly dependencies: UserApiGatewayAdapterDependencies,
  ) {}

  async createUser(req: RegisterUserRequestDTO): Promise<UserResponseDTO> {
    const response = new UserResponseDTO();
    try{
      req.validatePayload();
      const data = req.getData();
      const createUserDTO = new CreateUserDTO({
        email: data.attributes.email,
        password: data.attributes.password,
        name: data.attributes.name,
        role: data.attributes.role,
        city: data.attributes.city,
      });
      const userDTO = await this.dependencies.service.create(createUserDTO);
      return response.setStatus(HttpStatus.CREATED).setPayload(userDTO);
      } catch (error: Exception[] | Exception | unknown) {
            if (
              Array.isArray(error) &&
              error.every((errorItem) => errorItem instanceof ValidationException)
            )
              return response.setStatus(ValidationException.status).setErrors(error);
      
            if (error instanceof Exception)
              return response.setErrors([error]).setStatus(error.getStatusCode());
      
            return response
              .setStatus(UnexpectedException.status)
              .setErrors([new UnexpectedException(error as Error)]);
          }
  }

  async updateUser(req: UpdateUserRequestDTO): Promise<UserResponseDTO> {
    const response = new UserResponseDTO()
    try{
      req.validatePayload();
      req.validateParameters();
      const data = req.getData();
      const updateUserDTO = new UpdateUserDTO({
        id: data.id,
        email: data.attributes.email,
        password: data.attributes.password,
        name: data.attributes.name,
        role: data.attributes.role,
        city: data.attributes.city,
      });
      const userDTO = await this.dependencies.service.update(updateUserDTO);
      return response.setStatus(HttpStatus.OK).setPayload(userDTO);
    } catch (error: Exception[] | Exception | unknown) {
      if (
        Array.isArray(error) &&
        error.every((errorItem) => errorItem instanceof ValidationException)
      )
        return response.setStatus(ValidationException.status).setErrors(error);
  
      if (error instanceof Exception)
        return response.setErrors([error]).setStatus(error.getStatusCode());
  
      return response
        .setStatus(UnexpectedException.status)
        .setErrors([new UnexpectedException(error as Error)]);
    }
   
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
