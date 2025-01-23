import { IValidator } from '@lib/application/interfaces/validator.interface';
import { ValidationException } from '@lib/shared/exceptions/validation.exception';

type IRelationships = {
  [key: string]: {
    data: {
      type: string;
      id: string;
    };
  };
};

export type ICreatePayload<TAttributes> = {
  type: string;
  attributes: TAttributes;
  relationships?: IRelationships;
};

type IUpdatePayload<TAttributes> = {
  id: string;
  type: string;
  attributes: TAttributes;
  relationships?: IRelationships;
};

type IDeletePayload = {
  id: string;
  type: string;
};

type IFindPayload<TAttributes> = {
  id: string;
  type: string;
  attributes?: Partial<TAttributes>;
};

export type IRequestData<TAttributes> =
  | ICreatePayload<TAttributes>
  | Array<ICreatePayload<TAttributes>>
  | IUpdatePayload<TAttributes>
  | IDeletePayload
  | IFindPayload<TAttributes>
  | null;

export type IRequestPayload<TAttributes> = {
  data?: IRequestData<TAttributes>;
};

export type IRequestContext = {
  requestId: string;
  identity: {
    source: string;
    sub?: string;
  };
};

type IRequest<TAttributes> = {
  payload: IRequestPayload<TAttributes>;
  context: IRequestContext;
};

export abstract class RequestDTO<TAttributes = any> {
  private payload: IRequestPayload<TAttributes>;
  private context: IRequestContext;

  constructor(req: IRequest<TAttributes>) {
    this.payload = req.payload;
    this.context = req.context;
  }

  getPayload(): IRequestPayload<TAttributes> {
    return this.payload;
  }

  getData(): IRequestData<TAttributes> {
    if (!this.payload.data)
      throw new ValidationException('Data property is required', {
        pointer: '/data',
      });
    return this.payload.data;
  }

  getContext(): IRequestContext {
    return this.context;
  }

  abstract validatePayload(validationService: IValidator): void;
}

/*
export class getUserByIdRequest extends RequestDTO {
  protected getPayload(): IFindPayload<{}> {
    return super.getPayload() as IFindPayload<{}>;
  }

  validatePayload(): void {
    throw new Error("Method not implemented.");
  }

  getUserId(): string {
    return this.getPayload().id;
  }
}
*/
