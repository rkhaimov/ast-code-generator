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
  const file: SourceFile = project.createSourceFile('repositories');

  it('matches giving code style', () => {
    file.addClass(ClassBuilder.build('Account', paths as ISwagger['paths']));

    expect(file.getFullText()).toMatchSnapshot();
  });
});
