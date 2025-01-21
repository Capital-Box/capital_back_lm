type ICreateUser = {
  username: string;
  password: string;
  email: string;
  role: string;
  city: string;
};

export class CreateUserDTO {
  public readonly username: string;
  public readonly password: string;
  public readonly email: string;
  public readonly role: string;
  public readonly city: string;

  constructor(user: ICreateUser) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.role = user.role;
    this.city = user.city;
  }
}
