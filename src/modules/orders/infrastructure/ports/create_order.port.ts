import { RequestDTO } from "@lib/infrastructure/dtos/requests/request.dto";
import { ResponseDTO } from "@lib/infrastructure/dtos/responses/response.dto";

export interface CreateOrderPort {
  create(req: RequestDTO): Promise<ResponseDTO>;
}