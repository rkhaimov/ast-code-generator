import { isEmpty, isNil, compact } from 'lodash';

import { BaseImplementationBuilder } from '../BaseImplementationBuilder';

import { BlockStatementBody } from '../../../definitions/ast/common';
import { ISwaggerMethod } from '../../../definitions/swagger';
import { ICallExpression } from '../../../definitions/ast/function';

export class _PostImplementationBuilder extends BaseImplementationBuilder {
  operation = 'post';

  buildImplementation(url: string, operation: ISwaggerMethod): BlockStatementBody {
    const call = this.buildReturnStatement(this.operation, this.getArguments(url, operation));

    return [call];
  }

  getArguments(apiUrl: string, operation: ISwaggerMethod): ICallExpression['arguments'] {
    const urlLiteral = this.buildUrlLiteral(apiUrl);

    if (isEmpty(operation.parameters)) {
      return [urlLiteral];
    }

    const { body, url, query } = this.buildArguments(urlLiteral, operation);

    if (isNil(query)) {
      return compact([url, body]);
    }

    const template = this.buildTemplate([url, query]);

    return compact([template, body]);
  }
}

export const PostImplementationBuilder = new _PostImplementationBuilder();
