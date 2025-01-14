export class GetAllUsersResponseDTO {
  constructor(
    public readonly users: Array<{
      username: string;
      attributes: Record<string, string>;
    }>
  ) {}
}
