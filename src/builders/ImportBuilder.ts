import { ImportDeclarationStructure } from 'ts-simple-ast';
import { ProjectBuilder } from './ProjectBuilder';

class _ImportBuilder {
  importDefinitions(): ImportDeclarationStructure {
    return {
      namespaceImport: ProjectBuilder.FILE_NAMES.DEFINITIONS,
      moduleSpecifier: `./${ProjectBuilder.FILE_NAMES.DEFINITIONS}`,
    };
  }

  importRepositoryBase(): ImportDeclarationStructure {
    return {
      moduleSpecifier: `./${ProjectBuilder.FILE_NAMES.REPOSITORY_BASE}`,
      namedImports: [{ name: ProjectBuilder.FILE_NAMES.REPOSITORY_BASE }],
    };
  }
}

export const ImportBuilder = new _ImportBuilder();
