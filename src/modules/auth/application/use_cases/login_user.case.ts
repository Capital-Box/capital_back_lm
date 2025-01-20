import { LoginUserDTO } from "../dtos/login_user.dto";
import { TokenDTO } from "../dtos/token.dto";

export interface LoginUserCase {
  login(loginUserDTO: LoginUserDTO): Promise<TokenDTO>;
}