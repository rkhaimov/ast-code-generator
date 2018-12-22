export interface ISwagger {
  swagger: string;
  info: {
    version: string;
    title: string;
  };
  paths: {
    [path: string]: ISwaggerMethods;
  };
  definitions: {
    [model: string]: ISwaggerModel;
  };
  securityDefinitions: {};
  security: object[];
}

export type ISwaggerMethods = { get: ISwaggerMethod } | { post: ISwaggerMethod };

export interface ISwaggerMethod {
  tags: string[];
  operationId: string;
  consumes: string[];
  produces: string[];
  parameters: Array<{
    name: string;
    in: string;
    required: boolean;
    schema: ISwaggerModelRef | ISwaggerModel;
  }>;
  responses: {
    200: {
      description: string;
      schema: ISwaggerModelRef | ISwaggerModel;
    };
  };
}

interface ISwaggerModelRef {
  $ref: string;
}

interface ISwaggerModel {
  type: 'object';
  properties: {
    [property: string]: SwaggerDefinitionPropertyTypes;
  };
}

type SwaggerDefinitionPropertyTypes = ISwaggerString | ISwaggerInt | ISwaggerBoolean | ISwaggerArray;

interface ISwaggerPropertyTypeBase {
  readOnly?: boolean;
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
  items: ISwaggerModelRef | ISwaggerModel;
}
