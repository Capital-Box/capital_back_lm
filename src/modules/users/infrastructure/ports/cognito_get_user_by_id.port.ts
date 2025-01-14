import { InputPort } from "../../../../lib/infrastructure/ports/inputs/input.port";
import {
  GetUserByIdRequestDTO,
  GetUserByIdResponseDTO,
} from "../dtos/get_user_by_id.dto";

export interface CognitoGetUserByIdPort extends InputPort<GetUserByIdRequestDTO, GetUserByIdResponseDTO> {
    handle(input: GetUserByIdRequestDTO): Promise<GetUserByIdResponseDTO>;
}
