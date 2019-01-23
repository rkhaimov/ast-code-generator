/* tslint:disable:max-line-length */
import { reduce, last } from 'lodash';
import { InterfaceDeclarationStructure, PropertySignatureStructure } from 'ts-simple-ast';

import { ISwagger, SwaggerDefinitionPropertyTypes } from '../definitions/swagger';

class _ModelBuilder {
  buildModel(model: string, definition: ISwagger['definitions'][string]): InterfaceDeclarationStructure {
    const properties: InterfaceDeclarationStructure['properties'] = reduce(definition.properties, (acc, value: SwaggerDefinitionPropertyTypes, name) => {
      const property: PropertySignatureStructure = {
        name,
        type: this.toTsType(value),
      };

      return (acc as InterfaceDeclarationStructure['properties'])!.concat(property);
    }, [] as InterfaceDeclarationStructure['properties']);

    return {
      name: `I${model}`,
      properties,
      isExported: true,
    };
  }

  private toTsType(property: SwaggerDefinitionPropertyTypes): string {
    switch (property.type) {
      case 'integer': {
        return 'number';
      }
      case 'string': {
        if (property.enum) {
          return property.enum.map((value) => `'${value}'`).join(' | ');
        }

        return 'string';
      }
      case 'array': {
        if (!('$ref' in property.items)) {
          throw new Error('Unrecognizable array swagger structure');
        }

        const name = this.getRefDefinitionName(property.items.$ref);

        return `${name}[]`;
      }
      default: {
        return property.type;
      }
    }
  }

  private getRefDefinitionName(ref: string): string {
    return `I${last(ref.split('/'))}`;
  }
}

export const ModelBuilder = new _ModelBuilder();
