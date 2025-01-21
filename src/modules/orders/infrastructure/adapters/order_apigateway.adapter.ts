import { CreateOrderCase } from "modules/orders/application/use_cases/create_order.case";
import { CreateOrderRequestDTO } from "../dto/requests/create_order_request.dto";
import { OrderResponseDTO } from "../dto/responses/order_response.dto";
import { CreateOrderPort } from "../ports/create_order.port";

interface OrderApiGatewayAdapterDependencies {
  service: CreateOrderCase;
}

export class OrderApiGatewayAdapter implements CreateOrderPort {
  constructor(private _dependencies: OrderApiGatewayAdapterDependencies) { }

  async create(req: CreateOrderRequestDTO): Promise<OrderResponseDTO> {
    req.validatePayload();
    const orderDTO = await this._dependencies.service.save(req.getCreateOrder());
    const response = new OrderResponseDTO(200, orderDTO);
    return response;
  }
}