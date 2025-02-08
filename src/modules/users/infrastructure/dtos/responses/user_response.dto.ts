import { ApiGatewayResponseDTO } from '@lib/infrastructure/dtos/responses/apigateway_response.dto';

interface IUserAttributes {
  username: string;
  email: string;
  role: string;
  city: string;
}

export class UserResponseDTO extends ApiGatewayResponseDTO<IUserAttributes> {}
