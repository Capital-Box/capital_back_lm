import { ApiGatewayAdapter } from "../../../../../lib/infrastructure/adapters/inputs/apigateway.adapter";
import { RequestDTO } from "../../../../../lib/infrastructure/dtos/request.dto";
import { ResponseDTO } from "../../../../../lib/infrastructure/dtos/response.dto";
import { ApiGatewayPort } from "../../../../../lib/infrastructure/ports/inputs/apigateway.port";
import { ICreateResource } from "../../../../../lib/infrastructure/types/resource.type";
import { RegisterUserUseCase } from "../../../application/use_cases/register_user.use_case";
import { RegisterUserRequestDTO } from "../../dtos/register_user.dto";

export class RegisterApiGatewayAdapter extends ApiGatewayAdapter implements ApiGatewayPort {
  constructor(private registerUserUseCase: RegisterUserUseCase) {
    super(registerUserUseCase);
  }

  async invoke(request: RequestDTO): Promise<ResponseDTO> {
    const response = new ResponseDTO();
    try {
      const userData = request.getBody<RegisterUserRequestDTO>()
        .data as ICreateResource<RegisterUserRequestDTO>;
      const user = await this.registerUserUseCase.invoke(userData.attributes);
      response.setData({
        id: user.id_token as string,
        type: "accessToken",
        attributes: {
          access_token: user.access_token,
        },
      });
      response.setStatusCode(200);
    } catch (err) {
      response.setStatusCode(401);
    } finally {
      return response;
    }
  }
}