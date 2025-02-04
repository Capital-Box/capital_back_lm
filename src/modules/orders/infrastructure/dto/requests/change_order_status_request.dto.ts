import { IValidator } from '@lib/application/interfaces/validator.interface';
import { ApiGatewayRequestDTO } from '@lib/infrastructure/dtos/requests/apigateway_request.dto';
import { IUpdatePayload } from '@lib/infrastructure/dtos/requests/request.dto';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { ChangeOrderStatusDTO } from 'modules/orders/application/dtos/change_order_status.dto';
import { NextOrderStatusDTO } from 'modules/orders/application/dtos/next_order_status.dto';
import { PrevOrderStatusDTO } from 'modules/orders/application/dtos/prev_order_status.dto';
import { OrderMainStatuses } from 'modules/orders/domain/enums/order_statuses.enum';
import { OrderSubStatuses } from 'modules/orders/domain/enums/order_sub_statuses.enum';

interface IChangeOrderStatusAttributes {
  main_status: OrderMainStatuses;
  sub_status: OrderSubStatuses;
}

export class ChangeOrderStatusRequestDTO extends ApiGatewayRequestDTO {
  constructor(event: APIGatewayProxyEventV2) {
    super(event);
  }

  validatePayload(validationService: IValidator): void {
    const changeOrderStatusDTO = this.getChangeOrderStatus();
    validationService.validate(changeOrderStatusDTO, 'pointer', 'attributes');
  }

  getData(): IUpdatePayload<IChangeOrderStatusAttributes> {
    return super.getData() as IUpdatePayload<IChangeOrderStatusAttributes>;
  }

  getChangeOrderStatus():
    | ChangeOrderStatusDTO
    | NextOrderStatusDTO
    | PrevOrderStatusDTO {
    const path = this.getPath();
    const data = this.getData();

    if (path.includes('next')) {
      return new NextOrderStatusDTO(this.getPathParameters().id || '');
    }

    if (path.includes('prev')) {
      return new PrevOrderStatusDTO(this.getPathParameters().id || '');
    }

    return new ChangeOrderStatusDTO(
      this.getPathParameters().id || '',
      data.attributes.main_status,
      data.attributes.sub_status,
    );
  }
}
