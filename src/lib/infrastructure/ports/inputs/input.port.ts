export interface InputPort<TRequest, TResponse> {
  handle(request: TRequest): Promise<TResponse>;
}