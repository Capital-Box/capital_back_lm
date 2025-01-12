import { IUseCase } from "../../../../lib/application/interfaces/use_case.interface";
import { CognitoRegisterAdapter } from "../../infrastructure/adapters/cognito_adapter/congito_register.adapter";
import {
  RegisterUserRequestDTO,
  RegisterUserResponseDTO,
} from "../../infrastructure/dtos/register_user.dto";

export class RegisterUserUseCase
  implements IUseCase<RegisterUserRequestDTO, Promise<RegisterUserResponseDTO>>
{
  constructor(
    private readonly cognitoRegisterAdapter: CognitoRegisterAdapter
  ) {}

  async invoke(
    input: RegisterUserRequestDTO
  ): Promise<RegisterUserResponseDTO> {
     return await this.cognitoRegisterAdapter.handle(input);
  }
}
