import { IUseCase } from '../../../../lib/application/interfaces/use_case.interface';
import { RegisterUserDTO } from '../../infrastructure/dtos/register_user.dto';
import { CognitoAuthPort } from '../../infrastructure/ports/cognito_register.port';


export class RegisterUserUseCase implements IUseCase<RegisterUserDTO, void> {
  constructor(private readonly cognitoAuthPort: CognitoAuthPort) {}

  async invoke(input: RegisterUserDTO): Promise<void> {
    await this.cognitoAuthPort.register(input);
  }
}
