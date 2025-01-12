import { InputPort } from '../../../../lib/infrastructure/ports/inputs/input.port';
import { RegisterUserRequestDTO, RegisterUserResponseDTO } from '../dtos/register_user.dto';

export interface CognitoRegisterPort extends InputPort <RegisterUserRequestDTO, RegisterUserResponseDTO> {
  handle(input: RegisterUserRequestDTO): Promise<RegisterUserResponseDTO>;
}
