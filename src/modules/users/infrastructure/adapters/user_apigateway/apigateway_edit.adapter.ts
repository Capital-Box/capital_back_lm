import { ApiGatewayAdapter } from "../../../../../lib/infrastructure/adapters/inputs/apigateway.adapter";
import { RequestDTO } from "../../../../../lib/infrastructure/dtos/request.dto";
import { ResponseDTO } from "../../../../../lib/infrastructure/dtos/response.dto";
import { ApiGatewayPort } from "../../../../../lib/infrastructure/ports/inputs/apigateway.port";
import { ICreateResource } from "../../../../../lib/infrastructure/types/resource.type";
import { EditUserUseCase } from "../../../application/use_cases/edit_user.use_case";
import { EditUserRequestDTO } from "../../dtos/edit_user.dto";

export class EditApiGatewayAdapter
  extends ApiGatewayAdapter
  implements ApiGatewayPort
{
  constructor(private readonly editUserUseCase: EditUserUseCase) {
    super(editUserUseCase);
  }

  async invoke(request: RequestDTO): Promise<ResponseDTO> {
    const response = new ResponseDTO();
    try {
      const userData = request.getBody<EditUserRequestDTO>()
        .data as ICreateResource<EditUserRequestDTO>;
      const result = await this.editUserUseCase.invoke(userData.attributes);

      response.setData({
        id: result.username,
        type: "user-edit",
        attributes: {
          username: result.username,
          message: result.message,
        },
      });
      response.setStatusCode(200);
    } catch (error) {
      response.setStatusCode(400);
      response.setErrors([
        {
          id: "1",
          title: "Edit User Error",
          code: "EditUserError",
          detail: (error as any).message,
        },
      ]);
    } finally {
      return response;
    }
  }
}
