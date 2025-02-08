import { Handler } from '@lib/infrastructure/types/handler';
import { RegisterUserRequestDTO } from '../dtos/requests/register_user_request.dto';
import { UserResponseDTO } from '../dtos/responses/user_response.dto';

export interface CreateUserPort {
  createUser: Handler<RegisterUserRequestDTO, UserResponseDTO>;
}
