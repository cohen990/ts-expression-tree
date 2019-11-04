class ExpressionTree {
    type: string;
    constructor(source: string){
        this.type = source;
    }
}

describe("should identify a return expression", () => {
    const source = "return";
    const expression = new ExpressionTree(source);
    it("should", () => {
        expect(expression.type).toBe("return");
    });
});
