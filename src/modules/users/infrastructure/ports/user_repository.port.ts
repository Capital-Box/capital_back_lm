import { IHasheable } from 'modules/users/application/interfaces/iHash.interface';
import { User } from 'modules/users/domain/entities/user.entity';

export interface UserRepositoryPort {
  save(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  findById(id: string, hashService: IHasheable): Promise<User | null>;
  findByEmail(email: string, hashService: IHasheable): Promise<User | null>;
  list: () => Promise<User[]>;
}
