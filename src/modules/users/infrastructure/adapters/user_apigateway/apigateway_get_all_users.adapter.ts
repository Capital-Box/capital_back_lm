import { ApiGatewayAdapter } from "../../../../../lib/infrastructure/adapters/inputs/apigateway.adapter";
import { GetAllUsersUseCase } from "../../../application/use_cases/get_all_users.use_case";
import { ResponseDTO } from "../../../../../lib/infrastructure/dtos/response.dto";
import { ApiGatewayPort } from "../../../../../lib/infrastructure/ports/inputs/apigateway.port";

export class ApiGatewayGetAllUsersAdapter
  extends ApiGatewayAdapter
  implements ApiGatewayPort
{
  constructor(private readonly getAllUsersUseCase: GetAllUsersUseCase) {
    super(getAllUsersUseCase);
  }

  async invoke(): Promise<ResponseDTO> {
    const response = new ResponseDTO();
    try {
      const users = await this.getAllUsersUseCase.invoke();

      response.setData({
        id: "1",
        type: "users",
        attributes: users,
      });

      response.setStatusCode(200);
    } catch (error: any) {
      response.setErrors([
        {
          id: "1",
          title: "Get Users Error",
          code: "GetUsersError",
          detail: (error as any).message,
        },
      ]);
      response.setStatusCode(500);
    } finally {
      return response;
    }
  }
}
