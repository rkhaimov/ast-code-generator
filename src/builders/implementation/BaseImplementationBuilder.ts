import { groupBy, isEmpty } from 'lodash';

import { BlockStatementBody, IIdentifier, ILiteral } from '../../definitions/ast/common';
import { ISwaggerMethod } from '../../definitions/swagger';
import { ICallExpression, IReturnStatement } from '../../definitions/ast/function';
import { ArgumentsGroup, IOperationArguments } from '../../definitions/builders/implementation';
import { ITemplateLiteral } from '../../definitions/ast/string';

export abstract class BaseImplementationBuilder {
  abstract operation: string;

  abstract buildImplementation(api: string, operation: ISwaggerMethod): BlockStatementBody;

  abstract getArguments(url: string, operation: ISwaggerMethod): ICallExpression['arguments'];

  buildReturnStatement(method: string, args: ICallExpression['arguments']): IReturnStatement {
    return {
      type: 'ReturnStatement',
      argument: this.buildsThisCall(method, args),
    };
  }

  protected buildsThisCall(method: string, args: ICallExpression['arguments']): ICallExpression {
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

  protected buildUrlLiteral(url: string): ILiteral {
    return {
      type: 'Literal',
      value: url,
    };
  }

  protected buildPayloadIdentifier(): IIdentifier {
    return {
      type: 'Identifier',
      name: 'payload',
    };
  }

  protected buildArguments(url: ILiteral, operation: ISwaggerMethod): IOperationArguments {
    const groupedArguments = this.getGroupedArguments(operation);
    const keys = Object.keys(groupedArguments) as Array<keyof ArgumentsGroup>;

    return keys
      .reduce((acc, key) => {
        const args = groupedArguments[key];

        if (isEmpty(args)) {
          return acc;
        }

        if (key === 'query') {
          return { ...acc, query: this.buildQueryExpression() };
        }

        if (key === 'body') {
          return { ...acc, body: this.buildPayloadIdentifier() };
        }

        return { ...acc, url: this.buildUrlPath(url) };
      }, { url } as IOperationArguments);
  }

  protected buildQueryExpression(): ICallExpression {
    return this.buildsThisCall('toQuery', [this.buildPayloadIdentifier()]);
  }

  protected buildUrlPath(url: ILiteral): ICallExpression {
    return this.buildsThisCall('fillPath', [url, this.buildPayloadIdentifier()]);
  }

  protected buildTemplate(expressions: [ICallExpression | ILiteral, ICallExpression]): ITemplateLiteral {
    const element: ITemplateLiteral['quasis'][0] = {
      type: 'TemplateElement',
      value: {
        raw: '',
        cooked: '',
      },
      tail: false,
    };

    return {
      type: 'TemplateLiteral',
      expressions,
      quasis: [
        element,
        element,
        { ...element, tail: true },
      ],
    };
  }

  private getGroupedArguments(operation: ISwaggerMethod): ArgumentsGroup {
    return groupBy(operation.parameters, 'in') as ArgumentsGroup;
  }
}
