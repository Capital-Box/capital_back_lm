import { RequestDTO } from '../../../../lib/infrastructure/dtos/request.dto';
import { ResponseDTO } from '../../../../lib/infrastructure/dtos/response.dto';
import { LoginUserUseCase } from '../../application/use_cases/login_user.use_case';
import { CognitoAuthAdapter } from './cognito_auth.adapter';
import { ApiGatewayAdapter } from '../../../../lib/infrastructure/adapters/inputs/apigateway.adapter';

// Deberia handlear la logica de la autenticacion de usuarios, registros y refrescar tokens?
// No, deberia ser un adaptador para la API Gateway
export class ApiGatewayUsersAdapter extends ApiGatewayAdapter {
  constructor() {
    super()
  }

  async invoke(request: RequestDTO): Promise<ResponseDTO> {
  }
}
