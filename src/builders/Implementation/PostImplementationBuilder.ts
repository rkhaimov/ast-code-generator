import { BaseImplementationBuilder } from './BaseImplementationBuilder';

import { FunctionExpressionBody, ILiteral } from '../../definitions/class/ast';
import { ISwaggerMethod } from '../../definitions/swagger';

class _PostImplementationBuilder extends BaseImplementationBuilder {
  buildImplementation(api: string, operation: ISwaggerMethod): FunctionExpressionBody {
    const args = {
      type: 'Literal',
      value: api,
    };

    const call = this.buildThisCall('get', [args as ILiteral]);

    return [call];
  }
}

export const PostImplementationBuilder = new _PostImplementationBuilder();
