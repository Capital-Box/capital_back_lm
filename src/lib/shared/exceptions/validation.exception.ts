import { HttpStatus } from '@lib/infrastructure/enums/http_status.enum';
import { Exception, Source } from './exception';

export class ValidationException extends Exception {
  static status: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
  constructor(detail: string, source: Source) {
    super({
      code: 'validation_exception',
      status: ValidationException.status,
      title: 'Validation Exception',
      detail,
      source,
    });
  }
}
