/* tslint:disable:max-line-length */
import { reduce } from 'lodash';
import { InterfaceDeclarationStructure, PropertySignatureStructure } from 'ts-simple-ast';

import { ISwagger, SwaggerDefinitionPropertyTypes } from '../definitions/swagger';

class _ModelBuilder {
  buildModel(model: string, definition: ISwagger['definitions'][string]): InterfaceDeclarationStructure {
    const properties: InterfaceDeclarationStructure['properties'] = reduce(definition.properties, (acc, value: SwaggerDefinitionPropertyTypes, name) => {
      const property: PropertySignatureStructure = {
        name,
        type: this.toTsType(value.type),
      };

      return (acc as InterfaceDeclarationStructure['properties'])!.concat(property);
    }, [] as InterfaceDeclarationStructure['properties']);

    return {
      name: `I${model}`,
      properties,
    };
  }

  private toTsType(type: SwaggerDefinitionPropertyTypes['type']) {
    switch (type) {
      case 'integer': {
        return 'number';
      }
      default: {
        return type;
      }
    }
  }
}

export const ModelBuilder = new _ModelBuilder();
