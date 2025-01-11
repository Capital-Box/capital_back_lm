export interface IUseCase<TInput = undefined, TResult = undefined> {
  invoke(input: TInput): TResult;
}

