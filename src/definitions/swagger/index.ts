interface ISwagger {
  swagger: string;
  info: {
    version: string;
    title: string;
  };
  paths: {
    [path: string]: Partial<ISwaggerPath>;
  };
  definitions: {
    [model: string]: ISwaggerDefinition;
  };
  securityDefinitions: {};
  security: object[];
}

interface ISwaggerPath {
  get: ISwaggerOperation;
  post: ISwaggerOperation;
}

interface ISwaggerOperation {
  tags: string[];
  operationId: string;
  consumes: string[];
  produces: string[];
  parameters: Array<{
    name: string;
    in: string;
    required: boolean;
    schema: ISwaggerDefinitionRef | ISwaggerDefinition;
  }>;
  responses: {
    200: {
      description: string;
      schema: ISwaggerDefinitionRef | ISwaggerDefinition;
    };
  };
}

interface ISwaggerDefinitionRef {
  $ref: string;
}

interface ISwaggerDefinition {
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
  items: ISwaggerDefinitionRef | ISwaggerDefinition;
}
