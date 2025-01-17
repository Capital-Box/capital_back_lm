import { HttpStatus } from "../../enums/http_status.enum";

type IRelationships = {
  [key: string]: {
    data: {
      type: string;
      id: string;
    };
  };
};

export type IPayload<TAttributes> = {
  id: string;
  type: string;
  attributes: TAttributes;
  relationships?: IRelationships;
  links?: {
    self: string;
  };
};

export type IResponse<TAttributes> = {
  status: HttpStatus;
  payload: IPayload<TAttributes>;
};

export abstract class ResponseDTO<TAttributes = any> {
  private status: HttpStatus;
  private payload: IPayload<TAttributes>;

  constructor(res: IResponse<TAttributes>) {
    this.status = res.status;
    this.payload = res.payload;
  }

  getStatus(): HttpStatus {
    return this.status;
  }

  setStatus(status: HttpStatus): void {
    this.status = status;
  }

  getPayload(): IPayload<TAttributes> {
    return this.payload;
  }

  setPayload(payload: IPayload<TAttributes>): void {
    this.payload = payload;
  }

  send(): IResponse<TAttributes> | any {
    return {
      status: this.getStatus(),
      payload: this.getPayload(),
    };
  }
}
