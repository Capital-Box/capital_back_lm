import { RequestDTO } from "../../dtos/request.dto";
import { ResponseDTO } from "../../dtos/response.dto";
import { InputPort } from "../../ports/inputs/input.port";
import { IRequest } from "../../types/request.type";
import { IResponse } from "../../types/response.type";

export abstract class InputAdapter<TRequest, TResponse> implements InputPort<TRequest, TResponse> {
  constructor() { }

  protected abstract transformRequest(request: TRequest): IRequest;
  protected abstract transformResponse(response: IResponse): TResponse;

  protected abstract invoke(req: RequestDTO): Promise<ResponseDTO>;

  async handle(request: TRequest): Promise<TResponse> {
    const requestDTO = new RequestDTO(this.transformRequest(request));
    const responseDTO = await this.invoke(requestDTO);
    return this.transformResponse(responseDTO.send());
  }
}