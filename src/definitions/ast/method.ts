import { IIdentifier } from './common';
import { IFunctionExpression } from './function';

export interface IMethodDefinition {
  type: 'MethodDefinition';
  kind: 'method';
  static: boolean;
  computed: boolean;
  key: IIdentifier;
  value: IFunctionExpression;
}
