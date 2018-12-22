import reduce from 'lodash/reduce';
import last from 'lodash/last';
import isEmpty from 'lodash/isEmpty';

import { ISwagger, ISwaggerMethod, ISwaggerMethodParam, ISwaggerMethods } from '../definitions/swagger';
import {
  FunctionExpressionBodyTypes,
  IClassDeclaration, IFunctionExpression,
  IFunctionParam,
  IMethodDefinition, IReturnStatement,
} from '../definitions/class/ast';

interface IClassBuilder {
  build(name: string, methods: ISwagger['paths']): IClassDeclaration;
}

class _ClassBuilder implements IClassBuilder {
  build(name: string, methods: ISwagger['paths']): IClassDeclaration {
    const body = reduce(methods, (acc, operation, api) => {
      const method = this.buildMethod(api, operation);

      return acc.concat(method);
    }, [] as IMethodDefinition[]);

    return {
      type: 'ClassDeclaration',
      id: {
        type: 'Identifier',
        name: `${name}Repository`,
      },
      superClass: {
        type: 'Identifier',
        name: 'RepositoryBase', // TODO: Replace to class name
      },
      body: {
        type: 'ClassBody',
        body,
      },
    };
  }

  private buildMethod(api: string, operations: ISwaggerMethods): IMethodDefinition {
    const methodName = last<string>(api.split('/'));

    return {
      type: 'MethodDefinition',
      kind: 'method',
      static: false,
      computed: false,
      key: {
        name: methodName!,
        type: 'Identifier',
      },
      value: this.buildFunctionImplementation(api, operations),
    };
  }

  private buildFunctionImplementation(api: string, operations: ISwaggerMethods): IFunctionExpression {
    const method: ISwaggerMethod = 'get' in operations ? operations.get : operations.post;

    return {
      type: 'FunctionExpression',
      params: this.buildFunctionParams(method.parameters),
      body: {
        type: 'BlockStatement',
        body: [this.buildFunctionBody(api, operations)],
      },
      async: false,
      generator: false,
      expression: false,
      id: null,
    };
  }

  private buildFunctionBody(api: string, operations: ISwaggerMethods) {
    if ('get' in operations) {
      return this.buildGetFunctionBody(api, operations.get);
    }

    return this.buildPostFunctionBody(api, operations.post);
  }

  private buildFunctionParams(swaggerParams: ISwaggerMethodParam[]): IFunctionParam[] {
    if (isEmpty(swaggerParams)) {
      return [];
    }

    const param = {
      name: 'payload',
      type: 'Identifier',
    };

    return [param as IFunctionParam];
  }

  private buildPostFunctionBody(api: string, operation: ISwaggerMethod): IReturnStatement {
    return {
      type: 'ReturnStatement',
      argument: {
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
              name: 'http',
              type: 'Identifier',
            },
          },
          property: {
            type: 'Identifier',
            name: 'get',
          },
        },
        arguments: [
          {
            type: 'Literal',
            value: api,
          },
        ],
      },
    };
  }

  private buildGetFunctionBody(api: string, operation: ISwaggerMethod): IReturnStatement {
    return {
      type: 'ReturnStatement',
      argument: {
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
              name: 'http',
              type: 'Identifier',
            },
          },
          property: {
            type: 'Identifier',
            name: 'get',
          },
        },
        arguments: [
          {
            type: 'Literal',
            value: api,
          },
        ],
      },
    };
  }
}

export const ClassBuilder: IClassBuilder = new _ClassBuilder();
