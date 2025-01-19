type IUpdateUser = {
  username: string;
  password?: string;
  email?: string;
  role?: string;
  city?: string;
};

export class UpdateUserDTO {
  public readonly username?: string;
  public readonly password?: string;
  public readonly email?: string;
  public readonly role?: string;
  public readonly city?: string;

  constructor(updateUser: IUpdateUser) {
    this.username = updateUser?.username;
    this.password = updateUser?.password;
    this.email = updateUser?.email;
    this.role = updateUser?.role;
    this.city = updateUser?.city;
  }
}
