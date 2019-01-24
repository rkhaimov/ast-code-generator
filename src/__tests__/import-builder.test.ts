import { Project, SourceFile } from 'ts-simple-ast';

import { ImportBuilder } from '../builders/ImportBuilder';

describe('Import builder works well when', () => {
  const project = new Project();
  const file: SourceFile = project.createSourceFile('imports');

  it('matches giving code style', () => {
    file.addImportDeclaration(ImportBuilder.importRepositoryBase());

    expect(file.getFullText()).toMatchSnapshot();
  });
});
