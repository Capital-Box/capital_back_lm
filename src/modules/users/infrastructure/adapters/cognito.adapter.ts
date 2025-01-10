import { TestResult } from "aws-sdk/clients/cloudfront";
import { IUseCase } from "../../../../lib/application/interfaces/use_case.interface";
import { ApiGatewayAdapter } from "../../../../lib/infrastructure/adapters/inputs/apigateway.adapter";
import CreateUserDTO from '../dtos/createUsers.dto';
import UserDTO from "../dtos/user.dto";
import { CreateUserPort } from "../ports/createUsers.port";
import { RequestDTO } from "../../../../lib/infrastructure/dtos/request.dto";
import { ResponseDTO } from "../../../../lib/infrastructure/dtos/response.dto";
// import { Cognito } from 'aws-sdk';

class CreateUserCase implements IUseCase {
    async invoke<TInput, TResult>(input: TInput): Promise<TResult> {
        throw new Error("Method not implemented.");
        }
    }
  
  
export class HttpUserAdapter extends ApiGatewayAdapter implements CreateUserPort {
    constructor() {
        super(
            new CreateUserCase()
        );
    }

    register(user: RequestDTO): Promise<ResponseDTO> {
        throw new Error("Method not implemented.");
    }

    

 }


