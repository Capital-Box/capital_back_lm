export class Email {
  private _email: string;

  constructor(email: string) {
    this._email = email;
  }

  getEmail(): string {
    return this._email;
  }

  static isValid(email: string): boolean {
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
