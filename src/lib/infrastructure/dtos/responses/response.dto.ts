import { Exception, IException } from '@lib/shared/exceptions/exception';
import { HttpStatus } from '../../enums/http_status.enum';

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
  attributes: Omit <TAttributes, "id">;
  relationships?: IRelationships;
  links?: {
    self: string;
  };
};

export type IResponse<TAttributes> = {
  data?: IPayload<TAttributes> | undefined;
  errors?: IException[] | undefined;
};

export abstract class ResponseDTO<TAttributes = any> {
  private status: HttpStatus;
  private data: IPayload<TAttributes> | undefined;
  private errors: IException[] | undefined;

  constructor() {
    this.status = HttpStatus.OK;
  }

  getStatus(): HttpStatus {
    return this.status;
  }

  setStatus(status: HttpStatus): this {
    this.status = status;
    return this;
  }

  getPayload(): IPayload<TAttributes> | undefined {
    return this.data;
  }

  setPayload(payload: IPayload<TAttributes> | any): this {
    this.data = payload;
    return this;
  }

  getErrors(): IException[] | undefined {
    return this.errors;
  }

  setErrors(exceptions: Exception[]): this {
    this.errors = exceptions.map((exception) => exception.toPlain());
    return this;
  }

  send(): IResponse<TAttributes> | any {
    const response: IResponse<TAttributes> = {};

    if (this.getPayload()) response.data = this.getPayload();

    if (this.getErrors()) response.errors = this.getErrors();

    return response;
  }
}
