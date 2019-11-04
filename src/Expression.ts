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
}
