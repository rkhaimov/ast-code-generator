export interface IClassDeclaration {
  type: 'ClassDeclaration';
  id: {
    type: 'Identifier';
    name: string;
  };
  superClass: null;
  body: {
    type: 'ClassBody';
    body: IMethodDefinition[];
  };
}

export interface IMethodDefinition {
  type: 'MethodDefinition';
  kind: 'method';
  static: boolean;
  computed: boolean;
  key: {
    type: 'Identifier';
    name: string;
  };
  value: IFunctionExpression;
}

export interface IFunctionExpression {
  type: 'FunctionExpression';
  params: IFunctionParam[];
  body: {
    type: 'BlockStatement';
    body: [];
  };
  async: boolean;
  generator: boolean;
  expression: boolean;
  id: null;
}

export interface IFunctionParam {
  type: 'Identifier';
  name: string;
}
