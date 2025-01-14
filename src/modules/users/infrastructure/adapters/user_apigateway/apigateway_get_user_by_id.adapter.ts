import { ApiGatewayAdapter } from "../../../../../lib/infrastructure/adapters/inputs/apigateway.adapter";
import { RequestDTO } from "../../../../../lib/infrastructure/dtos/request.dto";
import { ResponseDTO } from "../../../../../lib/infrastructure/dtos/response.dto";
import { ICreateResource } from "../../../../../lib/infrastructure/types/resource.type";
import { GetUserByIdUseCase } from "../../../application/use_cases/get_user_by_id.use_case";
import { GetUserByIdRequestDTO } from "../../dtos/get_user_by_id.dto";

export class ApiGatewayGetUserByIdAdapter extends ApiGatewayAdapter {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {
    super(getUserByIdUseCase);
  }

  async invoke(request: RequestDTO): Promise<ResponseDTO> {
    const response = new ResponseDTO();

    try {
      const userData = request.getBody<GetUserByIdRequestDTO>()
        .data as ICreateResource<GetUserByIdRequestDTO>;
      const user = await this.getUserByIdUseCase.invoke(userData.attributes);

      response.setData({
        id: user.username,
        type: "user",
        attributes: user.attributes,
      });
      response.setStatusCode(200);
    } catch (error: any) {
      response.setErrors([
        {
          id: "1",
          title: "Get User By ID Error",
          code: "GetUserByIdError",
          detail: (error as any).message,
        },
      ]);
      response.setStatusCode(404);
    } finally {
      return response;
    }
  }
}
