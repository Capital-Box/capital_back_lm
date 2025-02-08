import { User } from 'modules/users/domain/entities/user.entity';

export interface UserRepositoryPort {
  save(user: User): Promise<User>;
}
