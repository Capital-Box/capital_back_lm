import { InputPort } from "../../../../lib/infrastructure/ports/inputs/input.port";
import { LoginUserRequestDTO, LoginUserResponseDTO } from "../dtos/login_user.dto";

export interface CognitoLoginPort extends InputPort <LoginUserRequestDTO, LoginUserResponseDTO> {
    handle(user: LoginUserRequestDTO): Promise<LoginUserResponseDTO>;
  }