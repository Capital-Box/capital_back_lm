import { CognitoAuthRepository } from 'modules/auth/infrastructure/adapters/cognito_auth_repository.adapter';
import {
  CreateAuthDTO,
  ICreateAuthAttributes,
} from '../infrastructure/dtos/request/create_auth.dto';
import { IRequest } from '@lib/infrastructure/dtos/requests/request.dto';

export const handle = async (req: IRequest<ICreateAuthAttributes>) => {
  const authRepository = new CognitoAuthRepository({
    userPoolId: process.env.COGNITO_USER_POOL_ID!,
    clientId: process.env.COGNITO_CLIENT_ID!,
  });

  const requestDTO = new CreateAuthDTO(req);

  await authRepository.save(requestDTO);
};
