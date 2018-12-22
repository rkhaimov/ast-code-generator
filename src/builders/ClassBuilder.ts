import reduce from 'lodash/reduce';

import { MethodBuilder } from './MethodBuilder';

import { ISwagger } from '../definitions/swagger';
import { IMethodDefinition } from '../definitions/ast/method';
import { IClassDeclaration } from '../definitions/ast/class';

interface IClassBuilder {
  build(name: string, methods: ISwagger['paths']): IClassDeclaration;
}

class _ClassBuilder implements IClassBuilder {
  build(name: string, methods: ISwagger['paths']): IClassDeclaration {
    const body = reduce(methods, (acc, operation, api) => {
      const method = MethodBuilder.buildMethod(api, operation);

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
        name: 'RepositoryBase', // TODO: Replace to ast name
      },
      body: {
        type: 'ClassBody',
        body,
      },
    };
  }
}

export const ClassBuilder: IClassBuilder = new _ClassBuilder();
