import { ApiGatewayAdapter } from "../../../../../lib/infrastructure/adapters/inputs/apigateway.adapter";
import { RequestDTO } from "../../../../../lib/infrastructure/dtos/request.dto";
import { ResponseDTO } from "../../../../../lib/infrastructure/dtos/response.dto";
import { ApiGatewayPort } from "../../../../../lib/infrastructure/ports/inputs/apigateway.port";
import { ICreateResource } from "../../../../../lib/infrastructure/types/resource.type";
import { RefreshUserTokenUseCase } from "../../../application/use_cases/refresh_token_user.use_case";
import { RefreshUserTokenRequestDTO } from "../../dtos/refresh_token_user.dto";

export class RefreshTokenApiGatewayAdapter
  extends ApiGatewayAdapter
  implements ApiGatewayPort
{
  constructor(private refreshTokenUseCase: RefreshUserTokenUseCase) {
    super(refreshTokenUseCase);
  }

  async invoke(request: RequestDTO): Promise<ResponseDTO> {
    const response = new ResponseDTO();
    try {
      const tokenData = request.getBody<RefreshUserTokenRequestDTO>()
        .data as ICreateResource<RefreshUserTokenRequestDTO>;
      const refreshedTokens = await this.refreshTokenUseCase.invoke(
        tokenData.attributes
      );

      response.setData({
        id: refreshedTokens.idToken,
        type: "refresh_token",
        attributes: {
            refresh_token: refreshedTokens.refreshToken,
            access_token: refreshedTokens.accessToken,
        },
      });
      response.setStatusCode(200);
    } catch (error) {
      response.setErrors([
        {
            id: "1",
            title: "RefreshToken Error",
            code: "RefreshTokenError",
            detail: (error as any).message,
          },
      ]);
      response.setStatusCode(400);
    } finally {
      return response;
    }
  }
}
