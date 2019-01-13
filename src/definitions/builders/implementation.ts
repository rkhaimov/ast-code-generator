import { ISwaggerMethodParam } from '../swagger';
import { IIdentifier, ILiteral } from '../ast/common';
import { ICallExpression } from '../ast/function';

export type ArgumentsGroup = {
  [P in ISwaggerMethodParam['in']]: ISwaggerMethodParam[];
};

export interface IOperationArguments {
  url: ILiteral | ICallExpression;
  query?: ICallExpression;
  body?: IIdentifier;
}
