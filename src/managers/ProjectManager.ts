/* tslint:disable:max-line-length */
import path from 'path';
import { reduce, first, keys, get, set, each } from 'lodash';
import { InterfaceDeclarationStructure, Project, SourceFile } from 'ts-simple-ast';

import { ModelBuilder } from '../builders/ModelBuilder';
import { ClassBuilder } from '../builders/ClassBuilder';

import swagger from '../__tests__/__mocks__/swagger.json';

import { ISwagger, ISwaggerMethod, ISwaggerOperations } from '../definitions/swagger';

interface IPathGroups {
  [name: string]: ISwagger['paths'];
}

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
    this.createClasses();

    this.project.save()
      .then(() => console.log('Saved!'));
  }

  private createDefinitions() {
    const models = reduce(swagger.definitions, (acc, definition, name) => {
      return acc.concat(ModelBuilder.buildModel(name, definition as ISwagger['definitions'][string]));
    }, [] as InterfaceDeclarationStructure[]);

    this.file.addInterfaces(models);
  }

  private createClasses() {
    const repositories: IPathGroups = reduce(swagger.paths as any as ISwagger['paths'], (acc, api: ISwaggerOperations, url) => {
      const operations = keys(api);
      const method: ISwaggerMethod = get(api, first(operations)!);
      const name = first(method.tags)!;

      set(acc, `${name}.${url}`, api);

      return acc;
    }, {} as IPathGroups);

    each(repositories, (paths, name) => this.file.addClass(ClassBuilder.build(name, paths)));
  }
}
