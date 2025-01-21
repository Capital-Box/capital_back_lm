import { CreateUserDTO } from "../dtos/create_user.dto";
import { UpdateUserDTO } from "../dtos/update_user.dto";
import { UserDTO } from "../dtos/user.dto";
import { CreateUserCase } from "../use_cases/create_user.case";
import { UpdateUserCase } from "../use_cases/update_user.case";

export class UserService implements CreateUserCase, UpdateUserCase {
  create(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    throw new Error("Method not implemented.");
  }

  update(updateUserDTO: UpdateUserDTO): Promise<UserDTO> {
    throw new Error("Method not implemented.");
  }
}
