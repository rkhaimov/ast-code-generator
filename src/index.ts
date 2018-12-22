import { parse } from '@babel/parser';
import * as escodegen from 'escodegen';

const code = escodegen.generate({
  type: 'BinaryExpression',
  operator: '+',
  left: { type: 'Literal', value: 40 },
  right: { type: 'Literal', value: 2 },
});

const ast = parse(code);

console.log(ast.program.body);
