export class LoginUserRequestDTO {
  constructor(
    public readonly username: string,
    public readonly password: string
  ) {}
}

export class LoginUserResponseDTO {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken?: string,
    public readonly idToken?: string
  ) {}
}