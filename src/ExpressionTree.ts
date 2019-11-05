import { Expression } from "./Expression";
import { mapExpression } from "./ExpressionMapper";

export class ExpressionTree {
  root: Expression;

  private getChildren(source: string): Expression[] {
    source =
      source[source.length - 1] == ";"
        ? source.substr(0, source.length - 1)
        : source;
    const childrenRaw = source.split(";");
    return childrenRaw.map(x => mapExpression(x));
  }

  constructor(source: string) {
    const children = this.getChildren(source);
    this.root = new Expression("root", children);
  }

  public build(): Expression {
    return this.root;
  }
}
