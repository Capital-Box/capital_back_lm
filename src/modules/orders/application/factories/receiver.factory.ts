import { Receiver } from "modules/orders/domain/entities/receiver.entity";
import { ReceiverDTO } from "../dtos/reiceiver.dto";
import { Document } from "modules/orders/domain/value_objects/document.vo";
import { Email } from "@shared/value_objects/email.vo";
import { Phone } from "@shared/value_objects/phone.vo";
import { UUID } from "@shared/value_objects/uuid.vo";

export class ReceiverFactory {
  static create(receiver: ReceiverDTO): Receiver {
    return new Receiver({
      firstName: receiver.firstName,
      lastName: receiver.lastName,
      document: new Document(receiver.document),
      email: new Email(receiver.email.email),
      phone: new Phone(receiver.phone),
    });
  }
}
