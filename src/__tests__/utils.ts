import { reduce } from 'lodash';
import { InterfaceDeclarationStructure, Project, SourceFile } from 'ts-simple-ast';

import { ModelBuilder } from '../builders/ModelBuilder';

import swaggerMock from './__mocks__/swagger.json';

import { ISwagger } from '../definitions/swagger';

export const getMockDefinitionsFile = (): SourceFile => {
  const project = new Project();
  const file: SourceFile = project.createSourceFile('models');

  const models = reduce(swaggerMock.definitions, (acc, definition, name) => {
    return acc.concat(ModelBuilder.buildModel(name, definition as ISwagger['definitions'][string]));
  }, [] as InterfaceDeclarationStructure[]);

  file.addInterfaces(models);

  return file;
};
