import { Receiver } from "modules/orders/domain/entities/receiver.entity";
import { ReceiverDTO } from "../dtos/reiceiver.dto";
import { EmailDTO } from "@shared/dtos/email.dto";
import { PhoneDTO } from "@shared/dtos/phone.dto";

export class ReceiverMapper {
  static toDTO(receiver: Receiver): ReceiverDTO {
    return new ReceiverDTO({
      firstName: receiver.getFirstName(),
      lastName: receiver.getLastName(),
      document: receiver.getDocument(),
      email: new EmailDTO(receiver.getEmail().getEmail()),
      phone: new PhoneDTO({
        areaCode: receiver.getPhone().getAreaCode(),
        number: receiver.getPhone().getNumber(),
        phoneType: receiver.getPhone().getPhoneType()
      })
    });
  }
}