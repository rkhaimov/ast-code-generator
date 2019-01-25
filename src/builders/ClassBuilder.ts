import { reduce } from 'lodash';
import {
  ClassDeclarationStructure,
  MethodDeclarationStructure,
  ts,
  VariableDeclarationKind,
  VariableStatementStructure,
} from 'ts-simple-ast';

import { MethodBuilder } from './MethodBuilder';

import { ISwagger } from '../definitions/swagger';
import { TsBuilder } from './TsBuilder';

interface IClassBuilder {
  build(name: string, methods: ISwagger['paths']): ClassDeclarationStructure;
  buildAssignment(name: string): VariableStatementStructure;
}

class _ClassBuilder implements IClassBuilder {
  build(name: string, methods: ISwagger['paths']): ClassDeclarationStructure {
    const body = reduce(methods, (acc, operation, api) => {
      const method = MethodBuilder.buildMethod(api, operation);

      return acc.concat(method);
    }, [] as MethodDeclarationStructure[]);

    return {
      name: this.getClassName(name),
      extends: 'RepositoryBase',
      methods: body,
      isExported: true,
    };
  }

  buildAssignment(name: string): VariableStatementStructure {
    const newExpression = ts.createNew(ts.createIdentifier(this.getClassName(name)), [], []);

    return {
      declarationKind: VariableDeclarationKind.Const,
      declarations: [
        {
          name: `${name}Repository`,
          initializer: TsBuilder.print(newExpression),
        },
      ],
      isExported: true,
    };
  }

  private getClassName(name: string): string {
    return `${name}RepositoryClass`;
  }
}

export const ClassBuilder: IClassBuilder = new _ClassBuilder();
