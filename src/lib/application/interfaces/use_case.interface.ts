export interface IUseCase {
  invoke<TInput, TResult>(input: TInput): TResult | any
}
