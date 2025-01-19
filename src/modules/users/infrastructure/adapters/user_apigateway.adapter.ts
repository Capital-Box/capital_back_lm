import { CreateUserPort } from "../ports/create_user.port";
import { CreateUserCase } from "modules/users/application/use_cases/create_user.case";
import { RegisterUserRequestDTO } from "../dtos/requests/register_user_request.dto";
import { UserResponseDTO } from "../dtos/responses/user_response.dto";
import { CreateUserDTO } from "modules/users/application/dtos/create_user.dto";
import { UpdateUserRequestDTO } from "../dtos/requests/update_user_request.dto";
import { UpdateUserDTO } from "modules/users/application/dtos/update_user.dto";
import { UpdateUserCase } from "modules/users/application/use_cases/update_user.case";

interface UserApiGatewayAdapterDependencies {
  service: CreateUserCase & UpdateUserCase;
}

export class UserApiGatewayAdapter implements CreateUserPort {
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
      status: 201,
      payload: {
        id: userDTO.email,
        type: "user",
        attributes: {
          ...userDTO,
        },
      },
    });
    return response;
  }

  async updateUser(req: UpdateUserRequestDTO): Promise<UserResponseDTO> {
    // O solo un mensaje de OK 200
    req.validatePayload();
    const reqPayload = req.getPayload();
    const updateUserDTO: UpdateUserDTO = new UpdateUserDTO(
      reqPayload.attributes
    );
    const userDTO = await this.dependencies.service.update(updateUserDTO);
    const response = new UserResponseDTO({
      status: 201,
      payload: {
        id: userDTO.email,
        type: "update",
        attributes: {
          ...userDTO,
        },
      },
    });
    return response;
  }

  
}
