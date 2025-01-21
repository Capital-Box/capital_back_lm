import { IResponse } from "@lib/infrastructure/dtos/responses/response.dto";
import { User } from "modules/users/domain/entities/user.entity";

// Conceptualmente esto es correcto? Yo tengo que usar algo de la capa interior entity para definir el contrato de la capa exterior port?
// Responder aqui: No, no es correcto. La capa de infraestructura no debería depender de la capa de dominio. En este caso, la entidad User debería ser una interfaz en la capa de infraestructura, y la capa de dominio debería implementarla.

export interface UserRepositoryPort {
  save(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<Object>;
  findById(id: string): Promise<User | null>;
  list: () => Promise<User[]>;
}
