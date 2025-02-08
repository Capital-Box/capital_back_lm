import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrderMainStatuses } from 'modules/orders/domain/enums/order_statuses.enum';
import { OrderSubStatuses } from 'modules/orders/domain/enums/order_sub_statuses.enum';

export class ChangeOrderStatusDTO {
  @IsNotEmpty()
  @IsString()
  public id: string;

  @IsNotEmpty()
  @IsEnum(OrderMainStatuses)
  public main_status: OrderMainStatuses;

  @IsNotEmpty()
  @IsEnum(OrderSubStatuses)
  public sub_status: OrderSubStatuses;

  constructor(
    id: string,
    main_status: OrderMainStatuses,
    sub_status: OrderSubStatuses,
  ) {
    this.id = id;
    this.main_status = main_status;
    this.sub_status = sub_status;
  }
}
