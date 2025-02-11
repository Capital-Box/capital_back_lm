import {
  ICreatePayload,
  RequestDTO,
} from '@lib/infrastructure/dtos/requests/request.dto';

export interface IDeleteAuthAttributes {
  username: string;
}

export class DeleteAuthDTO extends RequestDTO<IDeleteAuthAttributes> {
  validatePayload(): void {
    const payload = this.getData().attributes;
    if (!payload.username) {
      throw new Error('El nombre de usuario es obligatorio');
    }
  }

  getData(): ICreatePayload<IDeleteAuthAttributes> {
    return super.getData() as ICreatePayload<IDeleteAuthAttributes>;
  }

  get username(): string {
    return this.getData().attributes.username;
  }
}
