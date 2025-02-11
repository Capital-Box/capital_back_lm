export class UpdateAuthUserDTO {
  constructor(
    public readonly username?: string,
    public readonly email?: string,
    public readonly password?: string,
    public readonly role?: string,
  ) {}
}
