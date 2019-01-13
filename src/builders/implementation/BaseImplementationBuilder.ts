import { groupBy } from 'lodash';

import { BlockStatementBody, ILiteral } from '../../definitions/ast/common';
import { ISwaggerMethod } from '../../definitions/swagger';
import { ICallExpression, IReturnStatement } from '../../definitions/ast/function';
import { ArgumentsGroup } from '../../definitions/builders/implementation';

export abstract class BaseImplementationBuilder {
  abstract operation: string;

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

  getUrlLiteral(url: string): ILiteral {
    return {
      type: 'Literal',
      value: url,
    };
  }

  getGroupedArguments(operation: ISwaggerMethod): ArgumentsGroup {
    return groupBy(operation.parameters, 'in') as any as ArgumentsGroup;
  }
}
