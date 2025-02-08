import { IsEmail } from 'class-validator';

export class EmailDTO {
  @IsEmail()
  public email: string;

  constructor(email: string) {
    this.email = email;
  }
}
