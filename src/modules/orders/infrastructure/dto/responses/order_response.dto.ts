import { ApiGatewayResponseDTO } from "@lib/infrastructure/dtos/responses/apigateway_response.dto";
import { IPayload } from "@lib/infrastructure/dtos/responses/response.dto";
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
  constructor() {
    super();
  }

  setPayload(orderDTO: OrderDTO): this {
    super.setPayload({
      type: "order",
      id: orderDTO.getId(),
      attributes: {
        external_provider: orderDTO.getExternalProvider(),
        external_id: orderDTO.getExternalId(),
        main_status: orderDTO.getMainStatus(),
        sub_status: orderDTO.getSubStatus(),
        created_date: orderDTO.getCreatedDate(),
        last_updated: orderDTO.getLastUpdated(),
      },
      relationships: {
        receiver: {
          data: {
            id: orderDTO.getReceiverId(),
            type: "receiver",
          },
        },
      },
    });
    return this;
  }
}
