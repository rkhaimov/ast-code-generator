import { reduce } from 'lodash';
import { ClassDeclarationStructure, MethodDeclarationStructure, SourceFile } from 'ts-simple-ast';

import { MethodBuilder } from './MethodBuilder';

import { ISwagger } from '../definitions/swagger';

interface IClassBuilder {
  build(name: string, methods: ISwagger['paths'], definitions: SourceFile): ClassDeclarationStructure;
}

class _ClassBuilder implements IClassBuilder {
  build(name: string, methods: ISwagger['paths'], definitions: SourceFile): ClassDeclarationStructure {
    const body = reduce(methods, (acc, operation, api) => {
      const method = MethodBuilder.buildMethod(api, operation, definitions);

      return acc.concat(method);
    }, [] as MethodDeclarationStructure[]);

    return {
      name: `${name}Repository`,
      extends: 'RepositoryBase',
      methods: body,
      isExported: true,
    };
  }
}

export const ClassBuilder: IClassBuilder = new _ClassBuilder();
