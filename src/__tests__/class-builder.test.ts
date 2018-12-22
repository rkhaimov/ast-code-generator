import pick from 'lodash/pick';
import map from 'lodash/map';
import * as escodegen from 'escodegen';

import swaggerMock from './__mocks__/swagger.json';
import methodsMock from './__mocks__/methods.json';

import { ClassBuilder } from '../builders/ClassBuilder';

import { ISwagger } from '../definitions/swagger';

describe('Class builder works well when', () => {
  const urls = map(methodsMock.methods, 'url');
  const paths = pick(swaggerMock.paths, urls);
  const inClassName = 'Account';
  const outClassName = 'AccountRepository';
  const ast = ClassBuilder.build(inClassName, paths as ISwagger['paths']);

  console.log(escodegen.generate(ast));

  it('generates proper className', () => {
    expect(ast.id.name).toEqual(outClassName);
  });

  it('creates all api methods with properNames', () => {
    const actualMethodNames = map(ast.body.body, 'key.name');
    const expectedMethodNames = map(methodsMock.methods, 'expectedName');

    expect(actualMethodNames).toEqual(expectedMethodNames);
  });
});
