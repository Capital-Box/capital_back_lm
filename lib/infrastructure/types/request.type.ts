import { ICreateResource, IDeleteResource, IUpdateResource } from "./resource.type";

export type IRequestContext = {
  requestId: string;
  identity: {
    source: string;
    sub?: string;
  }
}

export type IRequestHeaders = {
  [key: string]: string | undefined;
}

export type IRequestQueryParameters = {
  [key: string]: string | undefined;
}

export type IRequestPathParameters = {
  [key: string]: string | undefined;
}

export type IRequestData<TAttributes> = ICreateResource<TAttributes> | IUpdateResource<TAttributes> | IDeleteResource;

export type IRequestBody<TAttributes = undefined> = {
  data: IRequestData<TAttributes> | IRequestData<TAttributes>[];
}

export type IRequest = {
  headers: IRequestHeaders;
  queryParameters: IRequestQueryParameters;
  pathParameters: IRequestPathParameters;
  body: string;
  context: IRequestContext;
}