export class RegisterUserRequestDTO {
  constructor(
    public readonly name: string,
    public readonly password: string,
    public readonly email: string,
    public readonly role: Role,
    public readonly city: City
  ) {}
}

export class RegisterUserResponseDTO {
  constructor(public readonly email: string, public readonly message: string) {}
}

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

enum City {
  CORDOBA = "CORDOBA",
  BUENOS_AIRES = "BUENOS_AIRES",
}
