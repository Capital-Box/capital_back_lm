import { IUseCase } from "../../../../lib/application/interfaces/use_case.interface";
import { CognitoGetAllUsersAdapter } from "../../infrastructure/adapters/cognito_adapter/cognito_get_all_users.adapter";
import { GetAllUsersResponseDTO } from "../../infrastructure/dtos/get_all_users.dto";

export class GetAllUsersUseCase
  implements IUseCase<void, Promise<GetAllUsersResponseDTO>>
{
  constructor(private readonly cognitoGetAllUsersAdapter: CognitoGetAllUsersAdapter) {}

  async invoke(): Promise<GetAllUsersResponseDTO> {
    return await this.cognitoGetAllUsersAdapter.handle();
  }
}
