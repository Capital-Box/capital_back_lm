import { UserDTO } from "../dtos/user.dto";

export interface ListUsersCase {
  list(): Promise<UserDTO[]>;
}
