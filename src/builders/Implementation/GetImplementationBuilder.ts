import { BaseImplementationBuilder } from './BaseImplementationBuilder';

import { ISwaggerMethod } from '../../definitions/swagger';
import { FunctionExpressionBody, ILiteral } from '../../definitions/class/ast';

class _GetImplementationBuilder extends BaseImplementationBuilder {
  buildImplementation(api: string, operation: ISwaggerMethod): FunctionExpressionBody {
    const args = {
      type: 'Literal',
      value: api,
    };

    const call = this.buildThisCall('get', [args as ILiteral]);

    return [call];
  }
}

export const GetImplementationBuilder = new _GetImplementationBuilder();
