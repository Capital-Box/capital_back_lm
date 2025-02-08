import { CreateOrderCase } from 'modules/orders/application/use_cases/create_order.case';
import { CreateOrderRequestDTO } from '../dto/requests/create_order_request.dto';
import { OrderResponseDTO } from '../dto/responses/order_response.dto';
import { CreateOrderPort } from '../ports/create_order.port';
import { HttpStatus } from '@lib/infrastructure/enums/http_status.enum';
import { UnexpectedException } from '@lib/shared/exceptions/unexpected.exception';
import { IValidator } from '@lib/application/interfaces/validator.interface';
import { Exception } from '@lib/shared/exceptions/exception';
import { ValidationException } from '@lib/shared/exceptions/validation.exception';
import { ChangeOrderStatusRequestDTO } from '../dto/requests/change_order_status_request.dto';
import { ChangeOrderStatusCase } from 'modules/orders/application/use_cases/change_order_status.case';

interface OrderApiGatewayAdapterDependencies {
  service: CreateOrderCase & ChangeOrderStatusCase;
  validator: IValidator;
}

export class OrderApiGatewayAdapter implements CreateOrderPort {
  constructor(private _dependencies: OrderApiGatewayAdapterDependencies) {}

  async create(req: CreateOrderRequestDTO): Promise<OrderResponseDTO> {
    const response = new OrderResponseDTO();
    try {
      req.validatePayload(this._dependencies.validator);
      const orderDTO = await this._dependencies.service.save(
        req.getCreateOrder(),
      );
      response.setStatus(HttpStatus.CREATED).setPayload(orderDTO);
      return response;
    } catch (error: Exception[] | Exception | unknown) {
      if (
        Array.isArray(error) &&
        error.every((errorItem) => errorItem instanceof ValidationException)
      )
        return response.setStatus(ValidationException.status).setErrors(error);

      if (error instanceof Exception)
        return response.setErrors([error]).setStatus(error.getStatusCode());

      return response
        .setStatus(UnexpectedException.status)
        .setErrors([new UnexpectedException(error as Error)]);
    }
  }

  async changeStatus(
    req: ChangeOrderStatusRequestDTO,
  ): Promise<OrderResponseDTO> {
    const response = new OrderResponseDTO();
    try {
      req.validatePayload(this._dependencies.validator);
      const orderDTO = await this._dependencies.service.changeStatus(
        req.getChangeOrderStatus(),
      );
      response.setStatus(HttpStatus.OK).setPayload(orderDTO);
      return response;
    } catch (error: Exception[] | Exception | unknown) {
      if (
        Array.isArray(error) &&
        error.every((errorItem) => errorItem instanceof ValidationException)
      )
        return response.setStatus(ValidationException.status).setErrors(error);

      if (error instanceof Exception)
        return response.setErrors([error]).setStatus(error.getStatusCode());

      return response
        .setStatus(UnexpectedException.status)
        .setErrors([new UnexpectedException(error as Error)]);
    }
  }
}
