import { Expression } from "./Expression";
import { ExpressionTree } from "./ExpressionTree";
import { Value } from "./Value";

it("should always have a root expression", () => {
  const source = "return";
  const builder = new ExpressionTree(source);
  const root = builder.root;
  expect(root.truncate()).toStrictEqual(new Expression("root"));
});

it("should identify a return expression", () => {
  const source = "return";
  const root = new ExpressionTree(source).build();
  const expression = root.children[0];
  expect(expression.truncate()).toStrictEqual(new Expression(source));
});

it("type should not contain any semicolons", () => {
  const targetStatement = "return";
  const source = `${targetStatement};`;
  const root = new ExpressionTree(source).build();
  const expression = root.children[0];
  expect(expression.truncate()).toStrictEqual(new Expression(targetStatement));
});

it("should find multiple builders at same level ", () => {
  const targetStatement = "return";
  const source = `${targetStatement};${targetStatement};`;
  const root = new ExpressionTree(source).build();
  expect(root.children.length).toBe(2);
  const firstChild = root.children[0];
  expect(firstChild.truncate()).toStrictEqual(new Expression(targetStatement));
  const secondChild = root.children[1];
  expect(secondChild.truncate()).toStrictEqual(new Expression(targetStatement));
});

it("should not ignore empty expressions", () => {
  const targetStatement = "return";
  const source = `${targetStatement};;${targetStatement};`;
  const root = new ExpressionTree(source).build();
  expect(root.children.length).toBe(3);
  const firstChild = root.children[0];
  expect(firstChild.truncate()).toStrictEqual(new Expression(targetStatement));
  const secondChild = root.children[1];
  expect(secondChild.truncate()).toStrictEqual(new Expression("empty"));
  const thirdChild = root.children[2];
  expect(thirdChild.truncate()).toStrictEqual(new Expression(targetStatement));
});

it("should recognise an invalid expression", () => {
  const source = "return5;";
  const root = new ExpressionTree(source).build();
  const child = root.children[0];
  expect(child.truncate()).toStrictEqual(new Expression("invalid"));
});

it("should recognise an expression returning a constant number", () => {
  const targetStatement = "return";
  const constant = 5;
  const source = `${targetStatement} ${constant};`;
  const root = new ExpressionTree(source).build();
  const child = root.children[0];
  expect(child.truncate()).toStrictEqual(new Expression(targetStatement));
  const subChild = child.children[0];
  expect(subChild.truncate()).toStrictEqual(
    new Expression("constant", undefined, new Value("number", `${constant}`))
  );
});

it("should recognise an expression returning a constant string", () => {
  const string = "I am a string";
  const source = `return "${string}";`;
  const root = new ExpressionTree(source).build();
  const child = root.children[0];
  expect(child.truncate()).toStrictEqual(new Expression("return"));
  const subChild = child.children[0];
  expect(subChild.truncate()).toStrictEqual(
    new Expression("constant", undefined, new Value("string", string))
  );
});

it("should recognise a mathematical expression being returned", () => {
  const augend = 1;
  const addend = 2;
  const mathematicalExpression = `${augend} + ${addend}`;
  const source = `return ${mathematicalExpression};`;
  const root = new ExpressionTree(source).build();
  const child = root.children[0];
  expect(child.truncate()).toStrictEqual(new Expression("return"));
  const subChild = child.children[0];
  expect(subChild.truncate()).toStrictEqual(
    new Expression("operation", undefined, new Value("operator", "+"))
  );
  const augendExpression = subChild.children[0];
  expect(augendExpression.truncate()).toStrictEqual(
    new Expression("constant", undefined, new Value("number", `${augend}`))
  );
  const addendExpression = subChild.children[1];
  expect(addendExpression.truncate()).toStrictEqual(
    new Expression("constant", undefined, new Value("number", `${addend}`))
  );
});
