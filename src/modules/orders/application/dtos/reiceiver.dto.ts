import { EmailDTO } from "@shared/dtos/email.dto";
import { PhoneDTO } from "@shared/dtos/phone.dto";
import { DocumentDTO } from "./document.dto";


interface ReceiverConstructor {
  firstName: string;
  lastName: string;
  document: DocumentDTO;
  email: EmailDTO;
  phone: PhoneDTO;
}

export class ReceiverDTO {
  private firstName: string;
  private lastName: string;
  private document: DocumentDTO;
  private email: EmailDTO;
  private phone: PhoneDTO;

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

  getEmail(): EmailDTO {
    return this.email;
  }

  getPhone(): PhoneDTO {
    return this.phone;
  }
}