import { CreateUserPort } from '../ports/create_user.port';
import { CreateUserCase } from 'modules/users/application/use_cases/create_user.case';
import { RegisterUserRequestDTO } from '../dtos/requests/register_user_request.dto';
import { UserResponseDTO } from '../dtos/responses/user_response.dto';
import { CreateUserDTO } from 'modules/users/application/dtos/create_user.dto';

interface UserApiGatewayAdapterDependencies {
  service: CreateUserCase;
}

export class UserApiGatewayAdapter implements CreateUserPort {
  constructor(
    private readonly dependencies: UserApiGatewayAdapterDependencies,
  ) {}

  async createUser(req: RegisterUserRequestDTO): Promise<UserResponseDTO> {
    req.validatePayload();
    const reqPayload = req.getPayload();
    const createUserDTO: CreateUserDTO = new CreateUserDTO(
      reqPayload.attributes,
    );
    const userDTO = await this.dependencies.service.create(createUserDTO);
    const response = new UserResponseDTO({
      status: 201,
      payload: {
        id: userDTO.email,
        type: 'user',
        attributes: {
          ...userDTO,
        },
      },
    });
    return response;
  }
}
