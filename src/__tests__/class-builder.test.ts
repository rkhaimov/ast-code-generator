import pick from 'lodash/pick';
import swaggerMock from './__mocks__/swagger.json';

import { ClassBuilder } from '../builders/ClassBuilder';

describe('Class builder works well when', () => {
  const paths = pick(swaggerMock.paths, ['/api/account', '/api/account/signin']);
  const className = 'Account';
  const ast = ClassBuilder.build(className, paths);

  it('generates proper className', () => {
    expect(ast.id!.name).toEqual(className);
  });
});
