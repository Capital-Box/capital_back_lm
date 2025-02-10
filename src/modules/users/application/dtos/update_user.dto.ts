type IUpdateUser = {
  id: string
  name?: string;
  password?: string;
  email?: string;
  role?: string;
  city?: string;
};

export class UpdateUserDTO {
  public readonly id: string;
  public readonly name?: string;
  public readonly password?: string;
  public readonly email?: string;
  public readonly role?: string;
  public readonly city?: string;

  constructor(updateUser: IUpdateUser) {
    this.id = updateUser.id;
    this.name = updateUser?.name;
    this.password = updateUser?.password;
    this.email = updateUser?.email;
    this.role = updateUser?.role;
    this.city = updateUser?.city;
  }
}
