import { EmailDTO } from "@shared/dtos/email.dto";
import { PhoneDTO } from "@shared/dtos/phone.dto";
import { DocumentDTO } from "./document.dto";
import { IsString, ValidateNested } from "class-validator";

interface ReceiverConstructor {
  firstName: string;
  lastName: string;
  document: DocumentDTO;
  email: EmailDTO;
  phone: PhoneDTO;
}

export class ReceiverDTO {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @ValidateNested()
  public document: DocumentDTO;

  @ValidateNested()
  public email: EmailDTO;

  @ValidateNested()
  public phone: PhoneDTO;

  constructor(receiver: ReceiverConstructor) {
    this.firstName = receiver.firstName;
    this.lastName = receiver.lastName;
    this.document = receiver.document;
    this.email = receiver.email;
    this.phone = receiver.phone;
  }
}
