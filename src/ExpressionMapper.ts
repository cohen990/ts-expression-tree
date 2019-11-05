import { Expression } from "./Expression";
import { Value } from "./Value";

const knownMappings = {
  "": "empty",
  return: "return"
};

export const mapExpression = (source: string): Expression => {
  if (!source.indexOf(" ")) {
    return simpleExpression(source);
  }

  if (source.indexOf('"') >= 0) {
    return returnStringExpression(source);
  }

  if (source.indexOf("=") >= 0) {
    return assignmentExpression(source);
  }

  const split = source.split(" ");
  if (knownMappings[split[0]]) {
    let child;
    if (split.indexOf("+") >= 0) {
      return operationExpression(split, child);
    } else {
      child = Expression.numberConstant(split[1]);
      return new Expression(knownMappings[split[0]], [child]);
    }
  }

  return Expression.invalid();
};

const operationExpression = (
  split: string[],
  child: Expression
): Expression => {
  const augend = Expression.numberConstant(split[1]);
  const addend = Expression.numberConstant(split[3]);
  child = Expression.operation(split[2], augend, addend);
  return new Expression(knownMappings[split[0]], [child]);
};

const assignmentExpression = (source: string): Expression => {
  const split = source.split(" ");
  const left = split[0];
  const leftExpression = new Expression(
    "variable",
    undefined,
    new Value("name", left)
  );
  const right = split[2];
  const rightExpression = Expression.numberConstant(right);
  return new Expression("assignment", [leftExpression, rightExpression]);
};

const returnStringExpression = (expressionText: string): Expression => {
  const firstSplit = expressionText.split('"');
  const returnStatement = firstSplit[0].trim();
  const child = Expression.stringConstant(firstSplit[1]);
  return new Expression(knownMappings[returnStatement], [child]);
};

const simpleExpression = (source: string) => {
  return new Expression(knownMappings[source]);
};
