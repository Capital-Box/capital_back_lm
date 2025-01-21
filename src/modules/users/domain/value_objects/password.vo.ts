export class Password {
  private _password: string;

  constructor(password: string) {
    this._password = password;
  }

  getPassword(): string {
    return this._password;
  }

  static isValid(password: string): boolean {
    return password.length >= 0;
  }
}
