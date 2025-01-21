export class EmailDTO {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }
}