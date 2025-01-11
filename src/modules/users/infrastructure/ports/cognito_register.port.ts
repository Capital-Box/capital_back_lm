import { RegisterUserDTO } from '../dtos/register_user.dto';

export interface CognitoAuthPort {
  register(input: RegisterUserDTO): Promise<void>;
}
