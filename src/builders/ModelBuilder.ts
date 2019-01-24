/* tslint:disable:max-line-length */
import { reduce, last } from 'lodash';
import { InterfaceDeclarationStructure, PropertySignatureStructure, ts } from 'ts-simple-ast';

import { ISwagger, SwaggerDefinitionPropertyTypes } from '../definitions/swagger';
import { TsBuilder } from './TsBuilder';

class _ModelBuilder {
  buildModel(model: string, definition: ISwagger['definitions'][string]): InterfaceDeclarationStructure {
    const properties: InterfaceDeclarationStructure['properties'] = reduce(definition.properties, (acc, value, name) => {
      const property: PropertySignatureStructure = {
        name,
        type: this.toTsType(value as SwaggerDefinitionPropertyTypes),
      };

      return (acc as InterfaceDeclarationStructure['properties'])!.concat(property);
    }, [] as InterfaceDeclarationStructure['properties']);

    return {
      name: `I${model}`,
      properties,
      isExported: true,
    };
  }

  getRefDefinitionName(ref: string): string {
    return `I${last(ref.split('/'))}`;
  }

  toTsType(property: SwaggerDefinitionPropertyTypes): string {
    switch (property.type) {
      case 'integer': {
        return 'number';
      }
      case 'string': {
        if (property.enum) {
          const literalTypeNodes = property.enum.map((text) => ts.createLiteralTypeNode(ts.createLiteral(text)));

          return TsBuilder.print(ts.createUnionTypeNode(literalTypeNodes));
        }

        return 'string';
      }
      case 'array': {
        if (!('$ref' in property.items)) {
          throw new Error('Unrecognizable array swagger structure');
        }

        const name = this.getRefDefinitionName(property.items.$ref);

        return TsBuilder.print(ts.createArrayTypeNode(ts.createTypeReferenceNode(name, [])));
      }
      case 'object': {
        if (!('$ref' in property.properties)) {
          throw new Error('Unrecognizable object swagger structure');
        }

        return this.getRefDefinitionName(property.properties.$ref as string);
      }
      default: {
        return property.type;
      }
    }
  }
}

export const ModelBuilder = new _ModelBuilder();
