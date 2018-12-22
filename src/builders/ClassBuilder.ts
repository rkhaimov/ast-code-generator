import reduce from 'lodash/reduce';
import last from 'lodash/last';

import { ISwagger, ISwaggerMethod, ISwaggerMethodParam, ISwaggerMethods } from '../definitions/swagger';
import { IClassDeclaration, IFunctionParam, IMethodDefinition } from '../definitions/class/ast';

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
      superClass: null,
      body: {
        type: 'ClassBody',
        body,
      },
    };
  }

  private buildMethod(api: string, operations: ISwaggerMethods): IMethodDefinition {
    const method: ISwaggerMethod = 'get' in operations ? operations.get : operations.post;
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
      value: {
        type: 'FunctionExpression',
        params: this.buildFunctionParams(method.parameters),
        body: {
          type: 'BlockStatement',
          body: [],
        },
        async: false,
        generator: false,
        expression: false,
        id: null,
      },
    };
  }

  private buildFunctionParams(swaggerParams: ISwaggerMethodParam[]): IFunctionParam[] {
    return swaggerParams.map<IFunctionParam>((param) => ({
      type: 'Identifier',
      name: param.name,
    }));
  }
}

export const ClassBuilder: IClassBuilder = new _ClassBuilder();
