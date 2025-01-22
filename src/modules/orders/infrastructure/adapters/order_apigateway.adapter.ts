import { CreateOrderCase } from "modules/orders/application/use_cases/create_order.case";
import { CreateOrderRequestDTO } from "../dto/requests/create_order_request.dto";
import { OrderResponseDTO } from "../dto/responses/order_response.dto";
import { CreateOrderPort } from "../ports/create_order.port";
import { ValidationException } from "@lib/shared/exceptions/validation.exception";
import { HttpStatus } from "@lib/infrastructure/enums/http_status.enum";
import { UnexpectedException } from "@lib/shared/exceptions/unexpected.exception";

interface OrderApiGatewayAdapterDependencies {
  service: CreateOrderCase;
}

export class OrderApiGatewayAdapter implements CreateOrderPort {
  constructor(private _dependencies: OrderApiGatewayAdapterDependencies) {}

  async create(req: CreateOrderRequestDTO): Promise<OrderResponseDTO> {
    const response = new OrderResponseDTO();
    try {
      req.validatePayload();
      const orderDTO = await this._dependencies.service.save(
        req.getCreateOrder()
      );
      response.setStatus(HttpStatus.OK).setPayload(orderDTO);
      return response;
    } catch (error: ValidationException[] | unknown) {
      if (
        Array.isArray(error) &&
        error.every((errorItem) => errorItem instanceof ValidationException)
      )
        return response.setStatus(ValidationException.status).setErrors(error);

      return response
        .setStatus(UnexpectedException.status)
        .setErrors([new UnexpectedException(error as Error)]);
    }
  }
}
