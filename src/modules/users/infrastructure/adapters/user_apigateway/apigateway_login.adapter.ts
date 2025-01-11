import { ApiGatewayAdapter } from "../../../../../lib/infrastructure/adapters/inputs/apigateway.adapter";
import { RequestDTO } from "../../../../../lib/infrastructure/dtos/request.dto";
import { ResponseDTO } from "../../../../../lib/infrastructure/dtos/response.dto";
import { ApiGatewayPort } from "../../../../../lib/infrastructure/ports/inputs/apigateway.port";
import { ICreateResource } from "../../../../../lib/infrastructure/types/resource.type";
import { LoginUserUseCase } from "../../../application/use_cases/login_user.use_case";
import { LoginUserRequestDTO } from "../../dtos/login_user.dto";

export class LoginApiGatewayAdapter
  extends ApiGatewayAdapter
  implements ApiGatewayPort
{
  constructor(private loginUserUseCase: LoginUserUseCase) {
    super(loginUserUseCase);
  }

  async invoke(request: RequestDTO): Promise<ResponseDTO> {
    const response = new ResponseDTO();
    try {
      const userData = request.getBody<LoginUserRequestDTO>()
        .data as ICreateResource<LoginUserRequestDTO>;
      const user = await this.loginUserUseCase.invoke(userData.attributes);
      response.setData({
        id: user.idToken as string,
        type: "accessToken",
        attributes: {
          access_token: user.accessToken,
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
