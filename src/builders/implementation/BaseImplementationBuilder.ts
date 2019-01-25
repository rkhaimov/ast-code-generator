import { groupBy, isEmpty, first, lowerFirst } from 'lodash';

import { BlockStatementBody, IIdentifier, ILiteral } from '../../definitions/ast/common';
import { ISwaggerMethod, SwaggerMethodParam } from '../../definitions/swagger';
import { ICallExpression, IReturnStatement } from '../../definitions/ast/function';
import { ArgumentsGroup, IOperationArguments } from '../../definitions/builders/implementation';
import { ITemplateLiteral } from '../../definitions/ast/string';
import { IArrayExpression } from '../../definitions/ast/array';

export abstract class BaseImplementationBuilder {
  abstract operation: string;

  abstract buildImplementation(api: string, operation: ISwaggerMethod): BlockStatementBody;

  abstract getArguments(url: string, operation: ISwaggerMethod): ICallExpression['arguments'];

  buildReturnStatement(method: string, args: ICallExpression['arguments']): IReturnStatement {
    return {
      type: 'ReturnStatement',
      argument: this.buildThisCall(method, args),
    };
  }

  protected buildThisCall(method: string, args: ICallExpression['arguments']): ICallExpression {
    return {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'MemberExpression',
          object: {
            type: 'ThisExpression',
          },
          computed: false,
          property: {
            type: 'Identifier',
            name: 'source',
          },
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
          return { ...acc, query: this.buildQueryExpression(args) };
        }

        if (key === 'body') {
          const arg = first(args)!;

          return { ...acc, body: this.buildPropertyGet(arg) };
        }

        return { ...acc, url: this.buildUrlPath(url) };
      }, { url } as IOperationArguments);
  }

  protected buildQueryExpression(args: SwaggerMethodParam[]): ICallExpression {
    const lowerCasedArgs = args.map<SwaggerMethodParam>((arg) => ({ ...arg, name: lowerFirst(arg.name) }));

    return this.buildThisCall('toQuery', [this.buildPick(lowerCasedArgs)]);
  }

  protected buildPropertyGet(arg: SwaggerMethodParam): ICallExpression {
    const key: ILiteral = {
      type: 'Literal',
      value: arg.name,
    };

    return this.buildThisCall('getProperty', [this.buildPayloadIdentifier(), key]);
  }

  protected buildPick(args: SwaggerMethodParam[]): ICallExpression {
    return this.buildThisCall('pick', [this.buildPayloadIdentifier(), this.buildArrayOfArgs(args)]);
  }

  protected buildUrlPath(url: ILiteral): ICallExpression {
    return this.buildThisCall('fillPath', [url, this.buildPayloadIdentifier()]);
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

  private buildArrayOfArgs(args: SwaggerMethodParam[]): IArrayExpression {
    return {
      type: 'ArrayExpression',
      elements: args.map<ILiteral>((arg) => ({ type: 'Literal', value: arg.name })),
    };
  }

  private getGroupedArguments(operation: ISwaggerMethod): ArgumentsGroup {
    return groupBy(operation.parameters, 'in') as ArgumentsGroup;
  }
}
