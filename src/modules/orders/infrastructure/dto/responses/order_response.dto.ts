import { ApiGatewayResponseDTO } from "@lib/infrastructure/dtos/responses/apigateway_response.dto";
import { HttpStatus } from "@lib/infrastructure/enums/http_status.enum";
import { OrderDTO } from "modules/orders/application/dtos/order.dto";

interface IOrderAttributes {
  external_provider: string | null;
  external_id: string | null;
  main_status: string;
  sub_status: string;
  created_date: Date;
  last_updated: Date;
}

export class OrderResponseDTO extends ApiGatewayResponseDTO<IOrderAttributes> {
  constructor(httpStatus: HttpStatus, order: OrderDTO) {
    super({
      status: httpStatus,
      payload: {
        type: 'order',
        id: order.getId(),
        attributes: {
          external_provider: order.getExternalProvider(),
          external_id: order.getExternalId(),
          main_status: order.getMainStatus(),
          sub_status: order.getSubStatus(),
          created_date: order.getCreatedDate(),
          last_updated: order.getLastUpdated(),
        },
        relationships: {
          receiver: {
            data: {
              id: order.getReceiverId(),
              type: 'receiver'
            }
          }
        }
      }
    });
  }

}