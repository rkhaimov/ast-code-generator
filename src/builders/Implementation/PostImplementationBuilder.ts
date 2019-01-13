import { isEmpty } from 'lodash';

import { BaseImplementationBuilder } from './BaseImplementationBuilder';

import { BlockStatementBody, IIdentifier, ILiteral } from '../../definitions/ast/common';
import { ISwaggerMethod } from '../../definitions/swagger';
import { ICallExpression } from '../../definitions/ast/function';

export class _PostImplementationBuilder extends BaseImplementationBuilder {
  operation = 'post';

  buildImplementation(url: string, operation: ISwaggerMethod): BlockStatementBody {
    const call = this.buildReturnStatetment(this.operation, this.getArguments(url, operation));

    return [call];
  }

  getArguments(url: string, operation: ISwaggerMethod): ICallExpression['arguments'] {
    const apiUrl: ILiteral = {
      type: 'Literal',
      value: url,
    };

    if (isEmpty(operation.parameters)) {
      return [apiUrl];
    }

    const payload: IIdentifier = {
      type: 'Identifier',
      name: 'payload',
    };

    return [apiUrl, payload];
  }
}

export const PostImplementationBuilder = new _PostImplementationBuilder();
