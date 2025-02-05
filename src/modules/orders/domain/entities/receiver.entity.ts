import { Email } from 'modules/orders/domain/value_objects/email.vo';
import { Document } from '../value_objects/document.vo';
import { Phone } from 'modules/orders/domain/value_objects/phone.vo';

interface ReceiverConstructor {
  firstName: string;
  lastName: string;
  document: Document;
  email: Email;
  phone: Phone;
}

export class Receiver {
  private firstName: string;
  private lastName: string;
  private document: Document;
  private email: Email;
  private phone: Phone;

  constructor(receiver: ReceiverConstructor) {
    this.firstName = receiver.firstName;
    this.lastName = receiver.lastName;
    this.document = receiver.document;
    this.email = receiver.email;
    this.phone = receiver.phone;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getDocument(): Document {
    return this.document;
  }

  getEmail(): Email {
    return this.email;
  }

  getPhone(): Phone {
    return this.phone;
  }
}
