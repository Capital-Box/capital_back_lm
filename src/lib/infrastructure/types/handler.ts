import { RequestDTO } from "../dtos/requests/request.dto";
import { ResponseDTO } from "../dtos/responses/response.dto";

export type Handler<
  Req extends RequestDTO = RequestDTO,
  Res extends ResponseDTO = ResponseDTO
> = (req: Req) => Promise<Res>;
