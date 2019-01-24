import { ts } from 'ts-simple-ast';

class _TsBuilder {
  project = ts.createSourceFile('ts-build-source.ts', '', ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS);
  printer = ts.createPrinter();

  print(node: ts.Node): string {
    return this.printer.printNode(ts.EmitHint.Unspecified, node, this.project);
  }
}

export const TsBuilder = new _TsBuilder();
