import { CreateAuthUserDTO } from 'modules/users/application/dtos/auth_modules_dtos/create_auth_user.dto';
import { AuthUserPort } from '../ports/auth_user.port';
import {
  InvokeCommand,
  InvokeCommandInput,
  LambdaClient,
} from '@aws-sdk/client-lambda';
import { UpdateAuthUserDTO } from 'modules/users/application/dtos/auth_modules_dtos/update_auth_user.dto';
import { DeleteAuthUserDTO } from 'modules/users/application/dtos/auth_modules_dtos/delete_auth_user.dto';

export class AuthUserInvokeAdapter implements AuthUserPort {
  constructor(
    private functionName: string,
    private client = new LambdaClient(),
  ) {}

  async save(createAuthUser: CreateAuthUserDTO): Promise<void> {
    const invokeLambdaInputParams: InvokeCommandInput = {
      FunctionName: this.functionName,
      InvocationType: 'Event',
      Payload: JSON.stringify({
        payload: {
          data: {
            type: 'register',
            attributes: {
              ...createAuthUser,
            },
          },
        },
      }),
    };
    const invokeCommand: InvokeCommand = new InvokeCommand(
      invokeLambdaInputParams,
    );
    await this.client.send(invokeCommand);
  }

  async update(updateAuthUser: UpdateAuthUserDTO): Promise<void> {
    const invokeLambdaInputParams: InvokeCommandInput = {
      FunctionName: this.functionName,
      InvocationType: 'Event',
      Payload: JSON.stringify({
        payload: {
          data: {
            type: 'update',
            attributes: {
              ...updateAuthUser,
            },
          },
        },
      }),
    };
    const invokeCommand: InvokeCommand = new InvokeCommand(
      invokeLambdaInputParams,
    );
    await this.client.send(invokeCommand);
  }

  async delete(deleteAuthUser: DeleteAuthUserDTO): Promise<void> {
    const invokeLambdaInputParams: InvokeCommandInput = {
      FunctionName: this.functionName,
      InvocationType: 'Event',
      Payload: JSON.stringify({
        payload: {
          data: {
            type: 'delete',
            attributes: {
              ...deleteAuthUser,
            },
          },
        },
      }),
    };
    const invokeCommand: InvokeCommand = new InvokeCommand(
      invokeLambdaInputParams,
    );
    await this.client.send(invokeCommand);
  }
}
