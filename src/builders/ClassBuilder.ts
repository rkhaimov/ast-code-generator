import { ClassDeclaration } from '@babel/types';

import { ISwagger } from '../definitions/swagger';
import { PartialPick } from '../definitions/utils';

type WeakClassDeclaration = PartialPick<ClassDeclaration, 'type' | 'id' | 'superClass' | 'body'>;

interface IClassBuilder {
  build(name: string, methods: ISwagger['paths']): WeakClassDeclaration;
}

class _ClassBuilder implements IClassBuilder {
  build(name: string, methods: ISwagger['paths']): WeakClassDeclaration {
    return {
      type: 'ClassDeclaration',
      id: {
        type: 'Identifier',
        name,
      },
      superClass: null,
      body: {
        type: 'ClassBody',
        body: [],
      },
    };
  }
}

export const ClassBuilder: IClassBuilder = new _ClassBuilder();
