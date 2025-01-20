type ILoginUser = {
    username: string;
    password: string;
    };

export class LoginUserDTO {
    public readonly username: string;
    public readonly password: string;

    constructor(user: ILoginUser) {
        this.username = user.username;
        this.password = user.password;
    }
}
