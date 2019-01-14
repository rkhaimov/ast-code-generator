import { Project, SourceFile } from 'ts-simple-ast';

import { ModelBuilder } from '../builders/ModelBuilder';

import swaggerMock from './__mocks__/swagger.json';

import { ISwagger } from '../definitions/swagger';

describe('Model builder works well when', () => {
  const project = new Project();
  const models: SourceFile = project.createSourceFile('models');

  it('matches giving code style', () => {
    const model = ModelBuilder.buildModel(
      'AccountInfo',
      swaggerMock.definitions.AccountInfo as ISwagger['definitions'][string],
    );

    models.addInterface(model);

    expect(models.getFullText()).toMatchSnapshot();
  });
});
