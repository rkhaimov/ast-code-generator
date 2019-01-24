import { ImportDeclarationStructure } from 'ts-simple-ast';

import { ProjectManager } from '../managers/ProjectManager';

class _ImportBuilder {
  importRepositoryBase(): ImportDeclarationStructure {
    return {
      moduleSpecifier: `./${ProjectManager.FILE_NAMES.REPOSITORY_BASE}`,
      namedImports: [{ name: ProjectManager.FILE_NAMES.REPOSITORY_BASE }],
    };
  }
}

export const ImportBuilder = new _ImportBuilder();
