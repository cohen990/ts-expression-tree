"use strict";
class ExpressionTree {
    constructor(source) {
        this.type = "return";
    }
}
describe("should identify a return expression", () => {
    const source = "return";
    const expression = new ExpressionTree(source);
    expect(expression.type).toBe("return");
});
//# sourceMappingURL=app.test.js.map
