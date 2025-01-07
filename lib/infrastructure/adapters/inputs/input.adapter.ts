import { IUseCase } from "../../../application/interfaces/use_case.interface";
import { RequestDTO } from "../../dtos/request.dto";
import { ResponseDTO } from "../../dtos/response.dto";
import { InputPort } from "../../ports/inputs/input.port";

export abstract class InputAdapter<TRequest, TResponse>
  implements InputPort<TRequest, TResponse>
{
  constructor(private useCase: IUseCase) {}

  protected abstract invoke(req: RequestDTO): Promise<ResponseDTO>;

  abstract handle(req: TRequest): Promise<TResponse>;
}
