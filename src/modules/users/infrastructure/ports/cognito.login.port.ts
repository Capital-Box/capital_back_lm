export interface LoginPort {
    login(username: string, password: string): Promise<{
      accessToken: string;
      refreshToken: string;
      idToken: string;
    }>;
  }
  