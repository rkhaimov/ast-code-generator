import { FunctionExpressionBody, ILiteral, IReturnStatement } from '../../definitions/class/ast';
import { ISwaggerMethod } from '../../definitions/swagger';

export abstract class BaseImplementationBuilder {
  abstract buildImplementation(api: string, operation: ISwaggerMethod): FunctionExpressionBody;

  buildThisCall(method: string, args: ILiteral[]): IReturnStatement {
    return {
      type: 'ReturnStatement',
      argument: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'ThisExpression',
          },
          property: {
            type: 'Identifier',
            name: method,
          },
        },
        arguments: args,
      },
    };
  }
}
