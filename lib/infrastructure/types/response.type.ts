import { IException } from "./exception.type";
import { IResource } from "./resource.type";

export type IResponseHeaders = {
  [key: string]: string;
}

export type IResponseData<TAttributes> = IResource<TAttributes> | IResource<TAttributes>[] | undefined;

export type IResponseErrors = IException[];

export type IResponseLinks = {
  self?: string;
  related?: string;
  first?: string;
  last?: string;
  prev?: string;
  next?: string;
}

export type IResponseBody<TAttributes = undefined> = {
  data?: IResponseData<TAttributes>;
  errors?: IResponseErrors;
  links?: IResponseLinks;
}

export type IResponse = {
  statusCode: number;
  headers: IResponseHeaders;
  body: string;
}