import { isEmpty, isNil } from 'lodash';

import { BaseImplementationBuilder } from '../BaseImplementationBuilder';

import { ISwaggerMethod } from '../../../definitions/swagger';
import { BlockStatementBody } from '../../../definitions/ast/common';
import { ICallExpression } from '../../../definitions/ast/function';

export class _GetImplementationBuilder extends BaseImplementationBuilder {
  operation = 'get';

  buildImplementation(url: string, operation: ISwaggerMethod): BlockStatementBody {
    return this.buildReturnStatement(this.operation, this.getArguments(url, operation));
  }

  getArguments(apiUrl: string, operation: ISwaggerMethod): ICallExpression['arguments'] {
    const urlLiteral = this.buildUrlLiteral(apiUrl);

    if (isEmpty(operation.parameters)) {
      return [urlLiteral];
    }

    const { url, query } = this.buildArguments(urlLiteral, operation);

    if (isNil(query)) {
      return [url];
    }

    return [this.buildTemplate([url, query])];
  }
}

export const GetImplementationBuilder = new _GetImplementationBuilder();
