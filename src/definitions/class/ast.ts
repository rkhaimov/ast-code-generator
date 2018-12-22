export interface IIdentifier {
  type: 'Identifier';
  name: string;
}

export interface IClassDeclaration {
  type: 'ClassDeclaration';
  id: IIdentifier;
  superClass: IIdentifier;
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
  key: IIdentifier;
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

// tslint:disable-next-line:no-empty-interface
export interface IFunctionParam extends IIdentifier {}
