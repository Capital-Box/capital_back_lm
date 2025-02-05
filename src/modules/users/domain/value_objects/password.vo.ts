import { IHasheable } from "modules/users/application/interfaces/iHash.interface";

interface PasswordDependencies {
  hashService: IHasheable;
}

export class Password {
  private _hashValue: string;
  private _hashService: IHasheable;

  constructor(hashedValue: string, dependencies: PasswordDependencies) {
    this._hashValue = hashedValue;
    this._hashService = dependencies.hashService;
  }

  static async create(value: string, dependencies: PasswordDependencies) {
    const hashedValue = await dependencies.hashService.hash(value);
    return new Password(hashedValue, dependencies);
  }

  getPassword(sensitive: boolean = true): string {
    return sensitive ? '***' : this._hashValue;
  }

  async compare(value: string): Promise<boolean> {
    return await this._hashService.compare(value, this._hashValue);
  }
}

