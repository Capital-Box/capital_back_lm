import { IResponse } from "@lib/infrastructure/dtos/responses/response.dto";

export interface DeleteUserCase {
    delete(userId: string): Promise<Object>;
  }
  