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

export type SwaggerMethodParam = ISwaggerBodyParam | ISwaggerQueryParam | ISwaggerPathParam;

interface ISwaggerParamBase {
  name: string;
  required: boolean;
  description?: string;
}

interface ISwaggerBodyParam extends ISwaggerParamBase {
  in: 'body';
  schema: ISwaggerModelRef;
}

interface ISwaggerQueryParam extends ISwaggerParamBase {
  in: 'query';
  type: 'string';
  format?: string;
}

interface ISwaggerPathParam extends ISwaggerParamBase {
  in: 'path';
  type: 'integer' | 'string';
  format?: 'date-time' | 'int32';
}

export interface ISwaggerMethod {
  tags: string[];
  operationId: string;
  consumes: string[];
  produces: string[];
  parameters: SwaggerMethodParam[];
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
  } | ISwaggerModelRef;
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
