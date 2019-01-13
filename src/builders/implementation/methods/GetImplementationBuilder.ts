import { isEmpty, isNil } from 'lodash';

import { BaseImplementationBuilder } from '../BaseImplementationBuilder';

import { ISwaggerMethod } from '../../../definitions/swagger';
import { BlockStatementBody, ILiteral } from '../../../definitions/ast/common';
import { ICallExpression } from '../../../definitions/ast/function';
import { ITemplateLiteral } from '../../../definitions/ast/string';

export class _GetImplementationBuilder extends BaseImplementationBuilder {
  operation = 'get';

  buildImplementation(url: string, operation: ISwaggerMethod): BlockStatementBody {
    const call = this.buildReturnStatement(this.operation, this.getArguments(url, operation));

    return [call];
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

  buildTemplate(expressions: [ICallExpression | ILiteral, ICallExpression]): ITemplateLiteral {
    const element: ITemplateLiteral['quasis'][0] = {
      type: 'TemplateElement',
      value: {
        raw: '',
        cooked: '',
      },
      tail: false,
    };

    return {
      type: 'TemplateLiteral',
      expressions,
      quasis: [
        element,
        element,
        { ...element, tail: true },
      ],
    };
  }
}

export const GetImplementationBuilder = new _GetImplementationBuilder();
