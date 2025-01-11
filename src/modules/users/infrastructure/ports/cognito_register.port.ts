import { InputPort } from '../../../../lib/infrastructure/ports/inputs/input.port';
import { RegisterUserDTO, RegisterUserResponseDTO } from '../dtos/register_user.dto';

export interface CognitoRegisterPort extends InputPort <RegisterUserDTO, RegisterUserResponseDTO> {
  handle(input: RegisterUserDTO): Promise<RegisterUserResponseDTO>;
}
