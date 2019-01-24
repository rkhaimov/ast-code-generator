import { isEmpty, last, keys, first, get, lowerFirst, isNil } from 'lodash';
import { MethodDeclarationStructure, ParameterDeclarationStructure, ts } from 'ts-simple-ast';
import escodegen from 'escodegen';

import { GetImplementationBuilder } from './implementation/methods/GetImplementationBuilder';
import { PostImplementationBuilder } from './implementation/methods/PostImplementationBuilder';
import { PutImplementationBuilder } from './implementation/methods/PutImplementationBuilder';

import { BlockStatementBody } from '../definitions/ast/common';
import {
  ISwaggerMethod,
  SwaggerMethodParam,
  ISwaggerOperations,
  SwaggerDefinitionPropertyTypes,
} from '../definitions/swagger';
import { ModelBuilder } from './ModelBuilder';
import { TsBuilder } from './TsBuilder';

interface IMethodBuilder {
  buildMethod(api: string, operations: ISwaggerOperations): MethodDeclarationStructure;
}

class _MethodBuilder implements IMethodBuilder {
  buildMethod(api: string, operations: ISwaggerOperations): MethodDeclarationStructure {
    const methodName = last<string>(api.split('/'));
    const methods: string[] = keys(operations);
    const method: ISwaggerMethod = get(operations, first(methods)!);

    return {
      name: methodName!,
      parameters: this.buildFunctionParams(method.parameters),
      bodyText: this.buildBodyText(api, operations),
      returnType: this.getReturnType(method.responses),
    };
  }

  private getReturnType(response: ISwaggerMethod['responses']): string {
    if (isNil(response['200'].schema)) {
      return TsBuilder.print(ts.createTypeReferenceNode('Promise', [ts.createTypeReferenceNode('void', [])]));
    }

    if ('$ref' in response['200'].schema) {
      const name = ModelBuilder.getRefDefinitionName(response['200'].schema.$ref);

      return TsBuilder.print(ts.createTypeReferenceNode('Promise', [ts.createTypeReferenceNode(name, [])]));
    }

    const type = ModelBuilder.toTsType(response['200'].schema);

    return TsBuilder.print(ts.createTypeReferenceNode('Promise', [ts.createTypeReferenceNode(type, [])]));
  }

  private buildBodyText(api: string, operations: ISwaggerOperations) {
    return escodegen.generate(this.buildFunctionBody(api, operations));
  }

  private buildFunctionBody(api: string, operations: ISwaggerOperations): BlockStatementBody {
    if ('get' in operations) {
      return GetImplementationBuilder.buildImplementation(api, operations.get);
    }

    if ('post' in operations) {
      return PostImplementationBuilder.buildImplementation(api, operations.post);
    }

    if ('put' in operations) {
      return PutImplementationBuilder.buildImplementation(api, operations.put);
    }

    if ('delete' in operations) {
      return PutImplementationBuilder.buildImplementation(api, operations.delete);
    }

    throw new Error(`Unknown operation(s) was provided ${keys(operations)}`);
  }

  private buildFunctionParams(swaggerParams: SwaggerMethodParam[]): ParameterDeclarationStructure[] {
    if (isEmpty(swaggerParams)) {
      return [];
    }

    const literalTypeNodes = swaggerParams.map<ts.TypeElement>((parameter) => {
      const typeName = ModelBuilder.toTsType(this.convertToSwaggerDefinition(parameter));
      const questionToken = parameter.required ? undefined : ts.createToken(ts.SyntaxKind.QuestionToken);

      return ts.createPropertySignature(
        [],
        lowerFirst(parameter.name),
        questionToken,
        ts.createTypeReferenceNode(typeName, []),
        undefined,
      );
    });

    const param: ParameterDeclarationStructure = {
      name: 'payload',
      type: TsBuilder.print(ts.createTypeLiteralNode(literalTypeNodes)),
    };

    return [param];
  }

  private convertToSwaggerDefinition(param: SwaggerMethodParam): SwaggerDefinitionPropertyTypes {
    switch (param.in) {
      case 'body': {
        return {
          type: 'object',
          properties: param.schema,
        };
      }
      case 'path': {
        return {
          ...param as SwaggerDefinitionPropertyTypes,
          type: 'string',
          format: param.format === 'int32' ? undefined : param.format,
        };
      }
      case 'query': {
        return param as SwaggerDefinitionPropertyTypes;
      }
      default: {
        return this.throwIfNever(param, '');
      }
    }
  }

  private throwIfNever(arg: never, message: string): never {
    throw new Error(message);
  }
}

export const MethodBuilder: IMethodBuilder = new _MethodBuilder();
