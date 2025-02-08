import { HttpStatus } from '@lib/infrastructure/enums/http_status.enum';
import { Exception } from './exception';

export class UnexpectedException extends Exception {
  static status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
  constructor(err: Error) {
    super({
      code: 'unexpected_error',
      status: UnexpectedException.status,
      title: 'Unexpected Error',
      detail: 'An unexpected error has occurred. Please contact support.',
    });
    console.error(err);
    this.stack = err.stack;
  }
}
