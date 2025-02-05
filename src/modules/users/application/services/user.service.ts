import { UserRepositoryPort } from "modules/users/infrastructure/ports/user_repository.port";
import { CreateUserDTO } from "../dtos/create_user.dto";
import { UpdateUserDTO } from "../dtos/update_user.dto";
import { UserDTO } from "../dtos/user.dto";
import { UserFactory } from "../factories/user.factory";
import { IHasheable } from "../interfaces/iHash.interface";
import { UserMapper } from "../mappers/user.mapper";
import { CreateUserCase } from "../use_cases/create_user.case";
import { DeleteUserCase } from "../use_cases/delete_user.case";
import { UpdateUserCase } from "../use_cases/update_user.case";

export class UserService
  implements CreateUserCase, UpdateUserCase, DeleteUserCase
{
  constructor(private readonly userRepository: UserRepositoryPort,
    private readonly hashService: IHasheable 
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const userExists = await this.checkExists(createUserDTO.email);
    if (userExists) {
      throw new Error("User already exists");
    }
    const userEntity = await UserFactory.create(createUserDTO, this.hashService);
    // const saveAuth = await this.authRepository.save(userEntity);
    const savedUser = await this.userRepository.save(userEntity);
    return UserMapper.toDTO(savedUser);
  }

  async update(updateUserDTO: UpdateUserDTO): Promise<UserDTO> {
    const userEntity = await this.userRepository.findById(updateUserDTO.id);
    if (!userEntity) {
      throw new Error("User not found");
    }
    if(updateUserDTO.email){
      userEntity.setEmail(updateUserDTO.email);
    }
    if(updateUserDTO.name){
      userEntity.setName(updateUserDTO.name);
    }
    if(updateUserDTO.role){
      userEntity.setRole(updateUserDTO.role);
    }
    if(updateUserDTO.city){
      userEntity.setCity(updateUserDTO.city);
    }
    if(updateUserDTO.password){
     await userEntity.setPassword(updateUserDTO.password, this.hashService);
    }
    const updatedUser = await this.userRepository.update(userEntity);
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
    const user = await this.userRepository.findByEmail(email);
    return user ? true : false;
  }

  async findById(userId: string): Promise<UserDTO> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return UserMapper.toDTO(user);
  }

  async findByEmail(email: string): Promise<UserDTO> {
    const user = await this.userRepository.findById(email);
    if (!user) {
      throw new Error("User not found");
    }
    return UserMapper.toDTO(user);
  }

}

