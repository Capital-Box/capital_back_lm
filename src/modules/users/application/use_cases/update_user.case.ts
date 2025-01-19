import { UpdateUserDTO } from "../dtos/update_user.dto";
import { UserDTO } from "../dtos/user.dto";

export interface UpdateUserCase {
  update(updateUserDTO: UpdateUserDTO): Promise<UserDTO>;
}
