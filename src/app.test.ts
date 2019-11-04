class Expression {
    type: string;
    child?: Expression;
    children?: Expression[];
    constructor(source: string, children?: Expression[]){
        this.type = source.replace(';', '');
        this.child = children ? children[0] : undefined;
        this.children = children;
    }
}

class ExpressionBuilder {
    root: Expression;
    constructor(source: string){
        const childrenRaw = source.split(';');
        const child = new Expression(childrenRaw[0]);
        if(childrenRaw.length > 1){
            const secondChild = new Expression(childrenRaw[1]);
            this.root = new Expression("root", [child, secondChild]);
        } else {
            this.root = new Expression("root", [child]);
        }
    }
}

it("should always have a root expression", () => {
    const source = "return";
    const builder = new ExpressionBuilder(source);
    const root = builder.root;
    expect(root.type).toBe("root");
});

it("should identify a return expression", () => {
    const source = "return";
    const builder = new ExpressionBuilder(source);
    const root = builder.root;
    const expression = root.child;
    expect(expression.type).toBe("return");
});

it("type should not contain any semicolons", () => {
    const source = "return;";
    const builder = new ExpressionBuilder(source);
    const root = builder.root;
    const expression = root.child;
    expect(expression.type).toBe("return");
});

it("should find multiple builders at same level ", () => {
    const source = "return;return;";
    const builder = new ExpressionBuilder(source);
    const root = builder.root;
    expect(root.children.length).toBe(2);
    const firstChild = root.children[0];
    expect(firstChild.type).toBe("return");
    const secondChild = root.children[1];
    expect(secondChild.type).toBe("return");
});
