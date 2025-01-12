export class RegisterUserRequestDTO {
  constructor(
    public readonly name: string,
    public readonly password: string,
    public readonly email: string,
    public readonly role: string,
    public readonly attributes?: Record<string, string>
  ) {}
}

export class RegisterUserResponseDTO {
  constructor(
    public readonly email: string,
    public readonly message: string
  ) {}
}
