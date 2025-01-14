export class GetUserByIdRequestDTO {
    constructor(public readonly username: string) {}
  }
  
  export class GetUserByIdResponseDTO {
    constructor(
      public readonly username: string,
      public readonly attributes: Record<string, string>
    ) {}
  }
  