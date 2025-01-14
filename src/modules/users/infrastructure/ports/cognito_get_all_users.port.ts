import { InputPort } from "../../../../lib/infrastructure/ports/inputs/input.port";
import { GetAllUsersResponseDTO } from "../dtos/get_all_users.dto";

export interface CognitoGetAllUsersPort extends InputPort<void, GetAllUsersResponseDTO> {
  handle(): Promise<GetAllUsersResponseDTO>;
}
