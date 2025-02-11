import { UserRepositoryPort } from 'modules/users/infrastructure/ports/user_repository.port';
import { CreateUserDTO } from '../dtos/create_user.dto';
import { UpdateUserDTO } from '../dtos/update_user.dto';
import { UserDTO } from '../dtos/user.dto';
import { UserFactory } from '../factories/user.factory';
import { IHasheable } from '../interfaces/iHash.interface';
import { UserMapper } from '../mappers/user.mapper';
import { CreateUserCase } from '../use_cases/create_user.case';
import { DeleteUserCase } from '../use_cases/delete_user.case';
import { UpdateUserCase } from '../use_cases/update_user.case';
import { AuthUserPort } from 'modules/users/infrastructure/ports/auth_user.port';
import { CreateAuthUserDTO } from '../dtos/create_auth_user.dto';

export class UserService
  implements CreateUserCase, UpdateUserCase, DeleteUserCase
{
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly hashService: IHasheable,
    private readonly authUserPort: AuthUserPort,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const userExists = await this.checkExists(createUserDTO.email);
    if (userExists) {
      throw new Error('User already exists');
    }
    const userEntity = await UserFactory.create(
      createUserDTO,
      this.hashService,
    );
    await this.authUserPort.save(
      new CreateAuthUserDTO(
        userEntity.getId(),
        userEntity.getEmail(),
        createUserDTO.password,
      ),
    );
    const savedUser = await this.userRepository.save(userEntity);
    const userDTO = UserMapper.toDTO(savedUser);
    return userDTO;
  }

  async update(updateUserDTO: UpdateUserDTO): Promise<UserDTO> {
    const userEntity = await this.userRepository.findById(
      updateUserDTO.id,
      this.hashService,
    );
    if (!userEntity) {
      throw new Error('User not found');
    }
    const userFactory = await UserFactory.update(
      userEntity,
      updateUserDTO,
      this.hashService,
    );
    const updatedUser = await this.userRepository.update(userFactory);
    return UserMapper.toDTO(updatedUser);
  }

  async delete(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }

  async list(): Promise<UserDTO[]> {
    const users = await this.userRepository.list();
    return users.map((user) => UserMapper.toDTO(user));
  }

  private async checkExists(email: string): Promise<boolean> {
    console.log('entre al checkExists', email);
    const user = await this.userRepository.findByEmail(email, this.hashService);
    return user ? true : false;
  }

  async findById(userId: string): Promise<UserDTO> {
    const user = await this.userRepository.findById(userId, this.hashService);
    if (!user) {
      throw new Error('User not found');
    }
    return UserMapper.toDTO(user);
  }

  async findByEmail(email: string): Promise<UserDTO> {
    const user = await this.userRepository.findByEmail(email, this.hashService);
    if (!user) {
      throw new Error('User not found');
    }
    return UserMapper.toDTO(user);
  }
}
