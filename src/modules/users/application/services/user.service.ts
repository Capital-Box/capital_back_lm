import { UserRepositoryPort } from "modules/users/infrastructure/ports/user_repository.port";
import { CreateUserDTO } from "../dtos/create_user.dto";
import { UpdateUserDTO } from "../dtos/update_user.dto";
import { UserDTO } from "../dtos/user.dto";
import { UserFactory } from "../factories/user.factory";
import { UserMapper } from "../mappers/user.mapper";
import { CreateUserCase } from "../use_cases/create_user.case";
import { UpdateUserCase } from "../use_cases/update_user.case";
import { DeleteUserCase } from "../use_cases/delete_user.case";
import { IResponse } from "@lib/infrastructure/dtos/responses/response.dto";

export class UserService implements CreateUserCase, UpdateUserCase, DeleteUserCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async create(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const userEntity = UserFactory.create(createUserDTO);
    const savedUser = await this.userRepository.save(userEntity);
    return UserMapper.toDTO(savedUser);
  }

  async update(updateUserDTO: UpdateUserDTO): Promise<UserDTO> {
    const userEntity = UserFactory.create({
      username: updateUserDTO.username,
      password: updateUserDTO.password,
      email: updateUserDTO.email,
      role: updateUserDTO.role,
      city: updateUserDTO.city,
    });
    const updatedUser = await this.userRepository.update(userEntity);
    return UserMapper.toDTO(updatedUser);
  }

  // Chequear si esta ok
  async delete(userId: string): Promise<IResponse<Object>>{
    const deleteUser = await this.userRepository.delete(userId);
    return deleteUser;
  }

  async list(): Promise<UserDTO[]> {
    const users = await this.userRepository.list();
    return users.map((user) => UserMapper.toDTO(user));
  }
}
