import { IUseCase } from "../../../../lib/application/interfaces/use_case.interface";
import { CognitoEditPort } from "../../infrastructure/ports/cognito_edit.port";
import { EditUserRequestDTO, EditUserResponseDTO } from "../../infrastructure/dtos/edit_user.dto";

export class EditUserUseCase implements IUseCase<EditUserRequestDTO, Promise<EditUserResponseDTO>> {
  constructor(private readonly cognitoEditAdapter: CognitoEditPort) {}

  async invoke(input: EditUserRequestDTO): Promise<EditUserResponseDTO> {
    return await this.cognitoEditAdapter.handle(input);
  }
}
