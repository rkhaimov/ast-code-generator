import { isEmpty, last, keys, first, get } from 'lodash';
import { MethodDeclarationStructure, ParameterDeclarationStructure, SourceFile, ts } from 'ts-simple-ast';
import escodegen from 'escodegen';

import { GetImplementationBuilder } from './implementation/methods/GetImplementationBuilder';
import { PostImplementationBuilder } from './implementation/methods/PostImplementationBuilder';
import { PutImplementationBuilder } from './implementation/methods/PutImplementationBuilder';

import { BlockStatementBody, IIdentifier } from '../definitions/ast/common';
import { ISwaggerMethod, ISwaggerMethodParam, ISwaggerOperations } from '../definitions/swagger';
import { ModelBuilder } from './ModelBuilder';
import { TsBuilder } from './TsBuilder';

interface IMethodBuilder {
  buildMethod(api: string, operations: ISwaggerOperations, definitions: SourceFile): MethodDeclarationStructure;
}

class _MethodBuilder implements IMethodBuilder {
  buildMethod(api: string, operations: ISwaggerOperations, definitions: SourceFile): MethodDeclarationStructure {
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

  private buildFunctionParams(swaggerParams: ISwaggerMethodParam[]): ParameterDeclarationStructure[] {
    if (isEmpty(swaggerParams)) {
      return [];
    }

    const param = {
      name: 'payload',
      type: 'Identifier',
    };

    return [param as IIdentifier];
  }
}

export const MethodBuilder: IMethodBuilder = new _MethodBuilder();
