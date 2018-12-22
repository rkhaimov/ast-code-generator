import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import keys from 'lodash/keys';
import first from 'lodash/first';
import get from 'lodash/get';

import { GetImplementationBuilder } from './Implementation/GetImplementationBuilder';
import { PostImplementationBuilder } from './Implementation/PostImplementationBuilder';

import { ISwaggerMethod, ISwaggerMethodParam, ISwaggerOperations } from '../definitions/swagger';
import { IMethodDefinition } from '../definitions/ast/method';
import { IFunctionExpression } from '../definitions/ast/function';
import { BlockStatementBody, IIdentifier } from '../definitions/ast/common';

interface IMethodBuilder {
  buildMethod(api: string, operations: ISwaggerOperations): IMethodDefinition;
}

class _MethodBuilder implements IMethodBuilder {
  buildMethod(api: string, operations: ISwaggerOperations): IMethodDefinition {
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

  private buildFunctionImplementation(api: string, operations: ISwaggerOperations): IFunctionExpression {
    const methods: string[] = keys(operations);
    const method: ISwaggerMethod = get(operations, first(methods)!);

    return {
      type: 'FunctionExpression',
      params: this.buildFunctionParams(method.parameters),
      body: {
        type: 'BlockStatement',
        body: this.buildFunctionBody(api, operations),
      },
      async: false,
      generator: false,
      expression: false,
      id: null,
    };
  }

  private buildFunctionBody(api: string, operations: ISwaggerOperations): BlockStatementBody {
    if ('get' in operations) {
      return GetImplementationBuilder.buildImplementation(api, operations.get);
    }

    return PostImplementationBuilder.buildImplementation(api, operations.post);
  }

  private buildFunctionParams(swaggerParams: ISwaggerMethodParam[]): IIdentifier[] {
    if (isEmpty(swaggerParams)) {
      return [];
    }

    const param = {
      name: 'payload',
      type: 'Identifier',
    };

    return [param as IIdentifier];
  }
}

export const MethodBuilder: IMethodBuilder = new _MethodBuilder();
