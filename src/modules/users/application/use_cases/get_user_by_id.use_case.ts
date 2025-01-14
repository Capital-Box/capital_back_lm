import { IUseCase } from "../../../../lib/application/interfaces/use_case.interface";
import { GetUserByIdRequestDTO, GetUserByIdResponseDTO } from "../../infrastructure/dtos/get_user_by_id.dto";
import { CognitoGetUserByIdPort } from "../../infrastructure/ports/cognito_get_user_by_id.port";


export class GetUserByIdUseCase
  implements IUseCase<GetUserByIdRequestDTO, Promise<GetUserByIdResponseDTO>>
{
  constructor(private readonly cognitoPort: CognitoGetUserByIdPort) {}

  async invoke(input: GetUserByIdRequestDTO): Promise<GetUserByIdResponseDTO> {

    if (!input.username) {
      throw new Error("Username is required.");
    }
    return await this.cognitoPort.handle(input);
  }
}
