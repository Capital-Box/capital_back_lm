export interface IValidator {
  validate(
    obj: object,
    source: 'pointer' | 'header' | 'parameter',
    level: 'attributes' | 'relationships',
  ): void;
}
