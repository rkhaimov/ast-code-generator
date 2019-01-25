import { IReturnStatement } from './function';
import { IThisExpression } from './class';

export interface IIdentifier {
  type: 'Identifier';
  name: string;
}

export interface ILiteral {
  type: 'Literal';
  value: string;
}

export type BlockStatementBodyTypes = IReturnStatement;
export type BlockStatementBody = BlockStatementBodyTypes;

export interface IBlockStatement {
  type: 'BlockStatement';
  body: BlockStatementBody;
}

export interface IMemberExpression {
  type: 'MemberExpression';
  object: IThisExpression | IMemberExpression;
  computed: false;
  property: IIdentifier;
}
