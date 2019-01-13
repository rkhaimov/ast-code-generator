import { isEmpty } from 'lodash';

import { BaseImplementationBuilder } from '../BaseImplementationBuilder';

import { ISwaggerMethod } from '../../../definitions/swagger';
import { BlockStatementBody, IIdentifier } from '../../../definitions/ast/common';
import { ICallExpression } from '../../../definitions/ast/function';
import { ITemplateLiteral } from '../../../definitions/ast/string';

export class _GetImplementationBuilder extends BaseImplementationBuilder {
  operation = 'get';

  buildImplementation(url: string, operation: ISwaggerMethod): BlockStatementBody {
    const call = this.buildReturnStatetment(this.operation, this.getArguments(url, operation));

    return [call];
  }

  getArguments(url: string, operation: ISwaggerMethod): ICallExpression['arguments'] {
    if (isEmpty(operation.parameters)) {
      return [this.getUrlLiteral(url)];
    }

    return [this.getUrlQuery(url)];
  }

  getUrlQuery(url: string): ITemplateLiteral {
    const payload: IIdentifier = {
      type: 'Identifier',
      name: 'payload',
    };

    return {
      type: 'TemplateLiteral',
      expressions: [this.buildsThisCall('toQuery', [payload])],
      quasis: [
        {
          type: 'TemplateElement',
          tail: false,
          value: {
            cooked: url,
            raw: url,
          },
        },
        {
          type: 'TemplateElement',
          tail: false,
          value: {
            cooked: '',
            raw: '',
          },
        },
      ],
    };
  }
}

export const GetImplementationBuilder = new _GetImplementationBuilder();
