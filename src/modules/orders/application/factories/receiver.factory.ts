import { Receiver } from "modules/orders/domain/entities/receiver.entity";
import { ReceiverDTO } from "../dtos/reiceiver.dto";
import { Document } from "modules/orders/domain/value_objects/document.vo";
import { Email } from "@shared/value_objects/email.vo";
import { Phone } from "@shared/value_objects/phone.vo";
import { UUID } from "@shared/value_objects/uuid.vo";

export class ReceiverFactory {
  static create(receiver: ReceiverDTO): Receiver {
    return new Receiver({
      firstName: receiver.getFirstName(),
      lastName: receiver.getLastName(),
      document: new Document(receiver.getDocument().getDocumentType(), receiver.getDocument().getDocumentNumber()),
      email: new Email(receiver.getEmail().getEmail()),
      phone: new Phone({
        areaCode: receiver.getPhone().getAreaCode(),
        number: receiver.getPhone().getNumber(),
        phoneType: receiver.getPhone().getPhoneType(),
      }),
    });
  }
}