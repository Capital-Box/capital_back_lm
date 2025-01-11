export class RegisterUserRequestDTO {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly email: string,
    public readonly attributes?: Record<string, string>
  ) {}
}

export class RegisterUserResponseDTO {
  constructor(
    public readonly id_token: string,
    public readonly access_token: string
  ) {}
}
