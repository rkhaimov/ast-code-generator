import { SwaggerMethodParam } from '../swagger';
import { ILiteral } from '../ast/common';
import { ICallExpression } from '../ast/function';

export type ArgumentsGroup = {
  [P in SwaggerMethodParam['in']]: SwaggerMethodParam[];
};

export interface IOperationArguments {
  url: ILiteral | ICallExpression;
  query?: ICallExpression;
  body?: ICallExpression;
}
