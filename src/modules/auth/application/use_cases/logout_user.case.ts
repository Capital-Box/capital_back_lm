export interface LogoutCase {
  logout(refreshToken: string): Promise<void>;
}
