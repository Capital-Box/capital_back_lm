export interface RegisterUserDTO {
    username: string;
    password: string;
    email: string;
    attributes?: Record<string, string>;
  }
  