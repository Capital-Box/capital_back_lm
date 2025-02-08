import { Email } from 'modules/users/domain/value_objects/email.vo';

export class EmailFactory {
  static create(email: string): Email {
    if (!Email.isValid(email)) throw new Error('Is not valid email');
    return new Email(email);
  }
}
