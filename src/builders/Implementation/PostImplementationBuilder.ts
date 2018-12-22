import { BaseImplementationBuilder } from './BaseImplementationBuilder';

import { BlockStatementBody, ILiteral } from '../../definitions/ast/common';
import { ISwaggerMethod } from '../../definitions/swagger';

class _PostImplementationBuilder extends BaseImplementationBuilder {
  buildImplementation(api: string, operation: ISwaggerMethod): BlockStatementBody {
    const args = {
      type: 'Literal',
      value: api,
    };

    const call = this.buildThisCall('get', [args as ILiteral]);

    return [call];
  }
}

export const PostImplementationBuilder = new _PostImplementationBuilder();
