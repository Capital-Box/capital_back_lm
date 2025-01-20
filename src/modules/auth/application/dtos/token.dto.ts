type IToken = {
    access_token: string;
    refresh_token: string;
    };

export class TokenDTO {
    public readonly access_token: string;
    public readonly refresh_token: string;

    constructor(token: IToken) {
        this.access_token = token.access_token;
        this.refresh_token = token.refresh_token;
    }
}