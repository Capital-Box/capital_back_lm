import { IException } from "../../shared/types/exception.type";
import { IResource } from "./resource.type";

export type IResponseHeaders = {
  [key: string]: string;
};

export type IResponseData<TAttributes> =
  | IResource<TAttributes>
  | IResource<TAttributes>[]
  | undefined;

export type IResponseErrors = IException[];

export type IResponseLinks = {
  self?: string;
  related?: string;
  first?: string;
  last?: string;
  prev?: string;
  next?: string;
};

export type IResponseBody<TAttributes = undefined> = {
  data?: IResponseData<TAttributes>;
  errors?: IResponseErrors;
  links?: IResponseLinks;
};

export type IResponseContext = {
  requestId: string;
  identity: {
    source: string;
    sub?: string;
  };
};

export type IResponse = {
  statusCode: number;
  headers: IResponseHeaders;
  body: string;
};
