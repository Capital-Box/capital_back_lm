type IUser = {
  username: string;
  password: string;
  email: string;
  role: string;
  city: string;
};

export class UserDTO {
  private readonly username: string;
  private readonly password: string;
  private readonly email: string;
  private readonly role: string;
  private readonly city: string;

  constructor(user: IUser) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.role = user.role;
    this.city = user.city;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  getEmail(): string {
    return this.email;
  }

  getRole(): string {
    return this.role;
  }

  getCity(): string {
    return this.city;
  }

  toObject(): IUser {
    return {
      username: this.username,
      password: this.password,
      email: this.email,
      role: this.role,
      city: this.city,
    };
  }
}
