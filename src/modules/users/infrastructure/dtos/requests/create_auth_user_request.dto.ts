import { IValidator } from '@lib/application/interfaces/validator.interface';
import { RequestDTO } from '@lib/infrastructure/dtos/requests/request.dto';
import { CreateAuthUserDTO } from 'modules/users/application/dtos/auth_modules_dtos/create_auth_user.dto';

export class CreateAuthUserRequestDTO extends RequestDTO<CreateAuthUserDTO> {
  constructor(data: CreateAuthUserDTO) {
    super({
      payload: {
        data: {
          type: 'register',
          attributes: data,
        },
      },
      context: {
        requestId: 'requestId',
        identity: {
          source: 'source',
          sub: 'sub',
        },
      },
    });
  }
  validatePayload(validationService: IValidator): void {}
}
