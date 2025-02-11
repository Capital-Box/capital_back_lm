import { CreateAuthUserDTO } from 'modules/users/application/dtos/create_auth_user.dto';
import { AuthUserPort } from '../ports/auth_user.port';
import {
  InvokeCommand,
  InvokeCommandInput,
  LambdaClient,
} from '@aws-sdk/client-lambda';

export class AuthUserInvokeAdapter implements AuthUserPort {
  constructor(
    private functionName: string,
    private client = new LambdaClient(),
  ) {}

  async save(createAuthUser: CreateAuthUserDTO): Promise<void> {
    console.log('createAuthUser', createAuthUser);
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
}
