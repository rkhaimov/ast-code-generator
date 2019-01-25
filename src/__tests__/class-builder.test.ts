import { pick, map } from 'lodash';
import { Project, SourceFile } from 'ts-simple-ast';

import swaggerMock from './__mocks__/swagger.json';
import methodsMock from './__mocks__/methods.json';

import { ClassBuilder } from '../builders/ClassBuilder';

import { ISwagger } from '../definitions/swagger';

describe('Class builder works well when', () => {
  const project = new Project();
  const urls = map(methodsMock.methods, 'url');
  const paths = pick(swaggerMock.paths, urls);

  it('matches giving code style', () => {
    const file: SourceFile = project.createSourceFile('repositories');

    file.addClass(ClassBuilder.build('Account', paths as ISwagger['paths']));

    expect(file.getFullText()).toMatchSnapshot();
  });

  it('adds proper export assignments', () => {
    const file: SourceFile = project.createSourceFile('exports');

    file.addVariableStatement(ClassBuilder.buildAssignment('Account'));

    expect(file.getFullText()).toMatchSnapshot();
  });
});
