export class EditUserRequestDTO {
    constructor(
      public readonly username: string,
      public readonly attributes: Record<string, string>,
      public readonly role?: string,
      public readonly isDeleted?: boolean
    ) {}
  }
  
  export class EditUserResponseDTO {
    constructor(
      public readonly username: string,
      public readonly message: string
    ) {}
  }
  