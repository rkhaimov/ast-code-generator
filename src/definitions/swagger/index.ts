export interface ISwagger {
  swagger: string;
  info: {
    version: string;
    title: string;
  };
  paths: {
    [path: string]: ISwaggerOperations;
  };
  definitions: {
    [model: string]: ISwaggerObject;
  };
  securityDefinitions: {};
  security: object[];
}

export type ISwaggerOperations =
  { get: ISwaggerMethod }
  | { post: ISwaggerMethod }
  | { delete: ISwaggerMethod }
  | { put: ISwaggerMethod };

export interface ISwaggerMethodParam {
  name: string;
  in: 'path' | 'query' | 'body';
  required: boolean;
  schema: ISwaggerModelRef | SwaggerDefinitionPropertyTypes;
}

export interface ISwaggerMethod {
  tags: string[];
  operationId: string;
  consumes: string[];
  produces: string[];
  parameters: ISwaggerMethodParam[];
  responses: {
    200: {
      description: string;
      schema: ISwaggerModelRef | SwaggerDefinitionPropertyTypes;
    };
  };
}

interface ISwaggerModelRef {
  $ref: string;
}

export type SwaggerDefinitionPropertyTypes = ISwaggerString
  | ISwaggerInt
  | ISwaggerBoolean
  | ISwaggerArray
  | ISwaggerObject;

interface ISwaggerPropertyTypeBase {
  readOnly?: boolean;
}

interface ISwaggerObject {
  type: 'object';
  properties: {
    [property: string]: SwaggerDefinitionPropertyTypes;
  };
}

interface ISwaggerString extends ISwaggerPropertyTypeBase {
  type: 'string';
  enum?: string[];
  format?: 'date-time';
}

interface ISwaggerInt extends ISwaggerPropertyTypeBase {
  type: 'integer';
  format: 'int32';
}

interface ISwaggerBoolean extends ISwaggerPropertyTypeBase {
  type: 'boolean';
}

interface ISwaggerArray extends ISwaggerPropertyTypeBase  {
  type: 'array';
  uniqueItems: boolean;
  items: ISwaggerModelRef | SwaggerDefinitionPropertyTypes;
}
