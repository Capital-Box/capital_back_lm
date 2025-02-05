export interface IHasheable {
    hash(value: string): Promise<string>;
    compare(value: string, hashedValue: string): Promise<boolean>;
  }