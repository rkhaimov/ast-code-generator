import { reduce } from 'lodash';
import { InterfaceDeclarationStructure, Project, SourceFile } from 'ts-simple-ast';
import path from 'path';

import { ModelBuilder } from '../builders/ModelBuilder';

import swagger from '../__tests__/__mocks__/swagger.json';

import { ISwagger } from '../definitions/swagger';

export class ProjectManager {
  static FILE_NAMES = {
    ROOT: 'generated',
    API: 'api',
    REPOSITORY_BASE: 'RepositoryBase',
  };

  project!: Project;
  file!: SourceFile;

  createProject() {
    this.project = new Project();

    this.file = this.project.createSourceFile(
      path.join(ProjectManager.FILE_NAMES.ROOT, `${ProjectManager.FILE_NAMES.API}.ts`),
    );

    this.createDefinitions();

    this.project.save()
      .then(() => console.log('Saved!'));
  }

  private createDefinitions() {
    const models = reduce(swagger.definitions, (acc, definition, name) => {
      return acc.concat(ModelBuilder.buildModel(name, definition as ISwagger['definitions'][string]));
    }, [] as InterfaceDeclarationStructure[]);

    this.file.addInterfaces(models);
  }
}
