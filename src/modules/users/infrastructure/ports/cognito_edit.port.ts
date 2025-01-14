import { InputPort } from "../../../../lib/infrastructure/ports/inputs/input.port";
import { EditUserRequestDTO, EditUserResponseDTO } from "../dtos/edit_user.dto";

export interface CognitoEditPort extends InputPort<EditUserRequestDTO, EditUserResponseDTO> {
  handle(input: EditUserRequestDTO): Promise<EditUserResponseDTO>;
}
