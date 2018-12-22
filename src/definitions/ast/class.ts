import { IIdentifier} from './common';
import { IMethodDefinition } from './method';

export interface IClassDeclaration {
  type: 'ClassDeclaration';
  id: IIdentifier;
  superClass: IIdentifier;
  body: IClassBody;
}

export interface IClassBody {
  type: 'ClassBody';
  body: IMethodDefinition[];
}

export interface IThisExpression {
  type: 'ThisExpression';
}
