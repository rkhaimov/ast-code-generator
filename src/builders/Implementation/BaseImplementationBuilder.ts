import { BlockStatementBody } from '../../definitions/ast/common';
import { ISwaggerMethod } from '../../definitions/swagger';
import { ICallExpression, IReturnStatement } from '../../definitions/ast/function';

export abstract class BaseImplementationBuilder {
  abstract buildImplementation(api: string, operation: ISwaggerMethod): BlockStatementBody;

  abstract getArguments(url: string, operation: ISwaggerMethod): ICallExpression['arguments'];

  buildReturnStatetment(method: string, args: ICallExpression['arguments']): IReturnStatement {
    return {
      type: 'ReturnStatement',
      argument: this.buildsThisCall(method, args),
    };
  }

  buildsThisCall(method: string, args: ICallExpression['arguments']): ICallExpression {
    return {
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
    };
  }
}
