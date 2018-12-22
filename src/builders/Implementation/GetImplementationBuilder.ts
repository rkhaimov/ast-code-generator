import { BaseImplementationBuilder } from './BaseImplementationBuilder';

import { ISwaggerMethod } from '../../definitions/swagger';
import { BlockStatementBody, ILiteral } from '../../definitions/ast/common';

class _GetImplementationBuilder extends BaseImplementationBuilder {
  buildImplementation(api: string, operation: ISwaggerMethod): BlockStatementBody {
    const args = {
      type: 'Literal',
      value: api,
    };

    const call = this.buildThisCall('get', [args as ILiteral]);

    return [call];
  }
}

export const GetImplementationBuilder = new _GetImplementationBuilder();
