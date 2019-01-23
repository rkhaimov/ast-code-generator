import { reduce } from 'lodash';
import { InterfaceDeclarationStructure, Project, SourceFile } from 'ts-simple-ast';

import { ModelBuilder } from '../builders/ModelBuilder';

import swaggerMock from './__mocks__/swagger.json';

import { ISwagger } from '../definitions/swagger';

describe('Model builder works well when', () => {
  const project = new Project();
  const file: SourceFile = project.createSourceFile('models');

  it('matches giving code style', () => {
    const models = reduce(swaggerMock.definitions, (acc, definition, name) => {
      return acc.concat(ModelBuilder.buildModel(name, definition as ISwagger['definitions'][string]));
    }, [] as InterfaceDeclarationStructure[]);

    file.addInterfaces(models);

    expect(file.getFullText()).toMatchSnapshot();
  });
});
