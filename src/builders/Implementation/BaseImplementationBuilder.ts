import { BlockStatementBody, IIdentifier, ILiteral } from '../../definitions/ast/common';
import { ISwaggerMethod } from '../../definitions/swagger';
import { IReturnStatement } from '../../definitions/ast/function';

export abstract class BaseImplementationBuilder {
  abstract buildImplementation(api: string, operation: ISwaggerMethod): BlockStatementBody;

  buildThisCall(method: string, args: Array<ILiteral | IIdentifier>): IReturnStatement {
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
