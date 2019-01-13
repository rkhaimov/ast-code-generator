import { ICallExpression } from './function';

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
  expressions: ICallExpression[];
  quasis: ITemplateElement[];
}
