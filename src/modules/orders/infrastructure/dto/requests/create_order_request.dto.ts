import { ApiGatewayRequestDTO } from "@lib/infrastructure/dtos/requests/apigateway_request.dto";
import { ICreatePayload, IRequestPayload } from "@lib/infrastructure/dtos/requests/request.dto";
import { EmailDTO } from "@shared/dtos/email.dto";
import { PhoneDTO } from "@shared/dtos/phone.dto";
import { PhoneTypes } from "@shared/enums/phone_types.enum";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { CreateOrderDTO } from "modules/orders/application/dtos/create_order.dto";
import { DocumentDTO } from "modules/orders/application/dtos/document.dto";
import { ReceiverDTO } from "modules/orders/application/dtos/reiceiver.dto";
import { DocumentTypes } from "modules/orders/domain/enums/document_types.enum";



interface ICreateOrderAttributes {
  receiver: {
    first_name: string;
    last_name: string;
    document: {
      document_type: DocumentTypes;
      document_number: string;
    };
    email: string;
    phone: {
      phone_type: PhoneTypes;
      area_code: string;
      number: string;
    };
  };
}

export class CreateOrderRequestDTO extends ApiGatewayRequestDTO<ICreateOrderAttributes> {
  constructor(event: APIGatewayProxyEventV2) {
    super(event);
  }

  validatePayload(): void {

  }

  getPayload(): ICreatePayload<ICreateOrderAttributes> {
    return super.getPayload() as ICreatePayload<ICreateOrderAttributes>;
  }

  getCreateOrder(): CreateOrderDTO {
    const orderAttributes = this.getPayload().attributes;
    const receiver = new ReceiverDTO({
      firstName: orderAttributes.receiver.first_name,
      lastName: orderAttributes.receiver.last_name,
      document: new DocumentDTO(orderAttributes.receiver.document.document_type, orderAttributes.receiver.document.document_number),
      email: new EmailDTO(orderAttributes.receiver.email),
      phone: new PhoneDTO({
        phoneType: orderAttributes.receiver.phone.phone_type,
        areaCode: orderAttributes.receiver.phone.area_code,
        number: orderAttributes.receiver.phone.number
      })
    });
    const createOrderDTO = new CreateOrderDTO({
      receiver,
      externalProvider: null,
      externalId: null
    });
    return createOrderDTO;
  }
}