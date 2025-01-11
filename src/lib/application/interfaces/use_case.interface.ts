export interface IUseCase<TInput = unknown, TResult = unknown> {
  invoke(input: TInput): TResult;
}

