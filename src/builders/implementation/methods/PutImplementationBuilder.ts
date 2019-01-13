import { _PostImplementationBuilder } from './PostImplementationBuilder';

class _PutImplementationBuilder extends _PostImplementationBuilder {
  operation = 'put';
}

export const PutImplementationBuilder = new _PutImplementationBuilder();
