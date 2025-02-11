import { CognitoAuthRepository } from 'modules/auth/infrastructure/adapters/cognito_auth_repository.adapter';
import {
  CreateAuthDTO,
  ICreateAuthAttributes,
} from '../infrastructure/dtos/request/create_auth.dto';
import { IRequest } from '@lib/infrastructure/dtos/requests/request.dto';

// Modificar esta
export const handle = async (req: IRequest<ICreateAuthAttributes>) => {
  console.log(req);
  console.log(typeof req);
  const authRepository = new CognitoAuthRepository({
    userPoolId: process.env.COGNITO_USER_POOL_ID!,
    clientId: process.env.COGNITO_CLIENT_ID!,
  });

  // 4. Construye el DTO de request
  const requestDTO = new CreateAuthDTO(req);

  // 5. Ejecuta el caso de uso y obtén la respuesta
  const responseDTO = await authRepository.save(requestDTO);

  console.log(responseDTO);
};
