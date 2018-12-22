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
  value: {
    type: 'FunctionExpression';
    params: [];
    body: {
      type: 'BlockStatement';
      body: [];
    };
    async: boolean;
    generator: boolean;
    expression: boolean;
    id: null;
  };
}
