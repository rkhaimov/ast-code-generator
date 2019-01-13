import { ILiteral } from './common';

export interface IArrayExpression {
  type: 'ArrayExpression';
  elements: ILiteral[];
}
