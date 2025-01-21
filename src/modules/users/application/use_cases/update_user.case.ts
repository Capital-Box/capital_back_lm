import { IUseCase } from "../../../../lib/application/interfaces/use_case.interface";
import { UpdateUserDTO } from "../dtos/update_user.dto";
import { UserDTO } from "../dtos/user.dto";

export interface UpdateUserCase extends IUseCase {
  update(updateUserDTO: UpdateUserDTO): Promise<UserDTO>;
}
