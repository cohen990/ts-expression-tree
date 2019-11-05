import { ExpressionType } from "./ExpressionType";
import { Value } from "./Value";

export class Expression {
  private type: ExpressionType;
  private value?: Value;

  children?: Expression[];

  constructor(type: ExpressionType, children?: Expression[], value?: Value) {
    this.type = type ? type : "empty";
    this.children = children;
    this.value = value;
  }

  public truncate(): Expression {
    return new Expression(this.type, undefined, this.value);
  }

  public static stringConstant = (string: string): Expression => {
    return new Expression("constant", undefined, new Value("string", string));
  };

  public static numberConstant = (number: string): Expression => {
    return new Expression("constant", undefined, new Value("number", number));
  };

  public static operation = (
    operator: string,
    left: Expression,
    right: Expression
  ): Expression => {
    return new Expression(
      "operation",
      [left, right],
      new Value("operator", operator)
    );
  };

  public static invalid = () => {
    return new Expression("invalid");
  };
}
