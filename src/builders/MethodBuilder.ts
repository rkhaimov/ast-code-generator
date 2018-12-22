import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import keys from 'lodash/keys';
import first from 'lodash/first';
import get from 'lodash/get';

import { GetImplementationBuilder } from './Implementation/GetImplementationBuilder';
import { PostImplementationBuilder } from './Implementation/PostImplementationBuilder';

import { ISwaggerMethod, ISwaggerMethodParam, ISwaggerOperations } from '../definitions/swagger';
import {
  FunctionExpressionBody,
  IFunctionExpression,
  IFunctionParam,
  IMethodDefinition,
} from '../definitions/class/ast';

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

  private buildFunctionBody(api: string, operations: ISwaggerOperations): FunctionExpressionBody {
    if ('get' in operations) {
      return GetImplementationBuilder.buildImplementation(api, operations.get);
    }

    return PostImplementationBuilder.buildImplementation(api, operations.post);
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
}

export const MethodBuilder: IMethodBuilder = new _MethodBuilder();
