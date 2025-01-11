export class RefreshUserTokenRequestDTO {
  constructor(public readonly refreshToken: string) {}
}

export class RefreshUserTokenResponseDTO {
    constructor(
        public readonly accessToken: string,
        public readonly refreshToken?: string,
        public readonly idToken?: string
    ) {}
    }