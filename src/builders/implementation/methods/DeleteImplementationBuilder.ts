import { _GetImplementationBuilder } from './GetImplementationBuilder';

class _DeleteImplementationBuilder extends _GetImplementationBuilder {
  operation = 'delete';
}

export const DeleteImplementationBuilder = new _DeleteImplementationBuilder();
