import { isEmpty } from 'lodash';

import { BaseImplementationBuilder } from '../BaseImplementationBuilder';

import { BlockStatementBody, IIdentifier } from '../../../definitions/ast/common';
import { ISwaggerMethod } from '../../../definitions/swagger';
import { ICallExpression } from '../../../definitions/ast/function';

export class _PostImplementationBuilder extends BaseImplementationBuilder {
  operation = 'post';

  buildImplementation(url: string, operation: ISwaggerMethod): BlockStatementBody {
    const call = this.buildReturnStatement(this.operation, this.getArguments(url, operation));

    return [call];
  }

  getArguments(url: string, operation: ISwaggerMethod): ICallExpression['arguments'] {
    const urlLiteral = this.buildUrlLiteral(url);

    if (isEmpty(operation.parameters)) {
      return [urlLiteral];
    }

    const payload: IIdentifier = {
      type: 'Identifier',
      name: 'payload',
    };

    return [urlLiteral, payload];
  }
}

export const PostImplementationBuilder = new _PostImplementationBuilder();
