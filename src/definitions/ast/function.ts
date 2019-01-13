import { IBlockStatement, IIdentifier, ILiteral, IMemberExpression } from './common';

export interface IFunctionExpression {
  type: 'FunctionExpression';
  params: IIdentifier[];
  body: IBlockStatement;
  async: boolean;
  generator: boolean;
  expression: boolean;
  id: null;
}

export interface ICallExpression {
  type: 'CallExpression';
  callee: IMemberExpression;
  arguments: Array<ILiteral | IIdentifier>;
}

export interface IReturnStatement {
  type: 'ReturnStatement';
  argument: ICallExpression;
}
