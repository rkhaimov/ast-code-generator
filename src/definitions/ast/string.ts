import { ICallExpression } from './function';
import { ILiteral } from './common';

interface ITemplateElement {
  type: 'TemplateElement';
  value: {
    cooked: string;
    raw: string;
  };
  tail: boolean;
}

export interface ITemplateLiteral {
  type: 'TemplateLiteral';
  expressions: Array<ICallExpression | ILiteral>;
  quasis: ITemplateElement[];
}
