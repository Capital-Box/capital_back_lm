import {
  IUpdatePayload,
  RequestDTO,
} from '@lib/infrastructure/dtos/requests/request.dto';

export interface IUpdateAuthAttributes {
  username: string;
  email: string;
  password: string;
  role: string;
}

export class UpdateAuthDTO extends RequestDTO<IUpdateAuthAttributes> {
  validatePayload(): void {
    const payload = this.getData().attributes;
    if (!payload.username) {
      throw new Error('El nombre de usuario es obligatorio');
    }
  }

  getData(): IUpdatePayload<IUpdateAuthAttributes> {
    return super.getData() as IUpdatePayload<IUpdateAuthAttributes>;
  }

  get username(): string {
    return this.getData().attributes.username;
  }

  get password(): string {
    return this.getData().attributes.password;
  }

  get email(): string {
    return this.getData().attributes.email;
  }

  get role(): string {
    return this.getData().attributes.role;
  }
}
