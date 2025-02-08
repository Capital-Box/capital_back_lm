interface OrderHistoryConstructor {
  order_id: string;
  id: string;
  order_main_status: string;
  order_sub_status: string;
  created_at: Date;
}

export class OrderHistoryDTO {
  public order_id!: string;
  public id!: string;
  public order_main_status!: string;
  public order_sub_status!: string;
  public created_at!: Date;

  constructor(orderHistory: OrderHistoryConstructor) {
    this.order_id = orderHistory.order_id;
    this.id = orderHistory.id;
    this.order_main_status = orderHistory.order_main_status;
    this.order_sub_status = orderHistory.order_sub_status;
    this.created_at = orderHistory.created_at;
  }
}
