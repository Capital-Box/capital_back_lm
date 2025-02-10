import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { CognitoAuthRepository } from 'modules/auth/infrastructure/adapters/cognito_auth_repository.adapter';
import { CreateAuthDTO } from '../infrastructure/dtos/request/create_auth.dto';

// Modificar esta
export const handle = async (req: APIGatewayProxyEventV2) => {
  const authRepository = new CognitoAuthRepository({
    userPoolId: process.env.COGNITO_USER_POOL_ID!,
    clientId: process.env.COGNITO_CLIENT_ID!,
  });
//   const authService = new AuthService(authRepository);


  // 4. Construye el DTO de request
  const requestDTO = new CreateAuthDTO(req);

  // 5. Ejecuta el caso de uso y obtén la respuesta
  const responseDTO = await authRepository.save(requestDTO);

  console.log(responseDTO);

};
