import { isEmpty } from 'lodash';

import { BaseImplementationBuilder } from './BaseImplementationBuilder';

import { ISwaggerMethod } from '../../definitions/swagger';
import { BlockStatementBody, IIdentifier, ILiteral } from '../../definitions/ast/common';
import { ICallExpression } from '../../definitions/ast/function';
import { ITemplateLiteral } from '../../definitions/ast/string';

export class _GetImplementationBuilder extends BaseImplementationBuilder {
  operation = 'get';

  buildImplementation(url: string, operation: ISwaggerMethod): BlockStatementBody {
    const call = this.buildReturnStatetment(this.operation, this.getArguments(url, operation));

    return [call];
  }

  getArguments(url: string, operation: ISwaggerMethod): ICallExpression['arguments'] {
    if (isEmpty(operation.parameters)) {
      const apiUrl: ILiteral = {
        type: 'Literal',
        value: url,
      };

      return [apiUrl];
    }

    const payload: IIdentifier = {
      type: 'Identifier',
      name: 'payload',
    };

    const queryUrl: ITemplateLiteral = {
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

    return [queryUrl];
  }
}

export const GetImplementationBuilder = new _GetImplementationBuilder();
