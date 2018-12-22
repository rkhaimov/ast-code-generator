export interface IIdentifier {
  type: 'Identifier';
  name: string;
}

export interface ILiteral {
  type: 'Literal';
  value: string;
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
    body: FunctionExpressionBodyTypes[];
  };
  async: boolean;
  generator: boolean;
  expression: boolean;
  id: null;
}

export type FunctionExpressionBodyTypes = IReturnStatement;

export interface IReturnStatement {
  type: 'ReturnStatement';
  argument: {
    type: 'CallExpression';
    callee: {
      type: 'MemberExpression';
      object: {
        type: 'MemberExpression';
        object: {
          type: 'ThisExpression';
        };
        computed: false;
        property: IIdentifier;
      };
      computed: false;
      property: IIdentifier;
    };
    arguments: ILiteral[];
  };
}

// tslint:disable-next-line:no-empty-interface
export interface IFunctionParam extends IIdentifier {}
