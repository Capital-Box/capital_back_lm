import { User } from "modules/users/domain/entities/user.entity";


export interface UserRepositoryPort {
  save(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  list: () => Promise<User[]>;
}
