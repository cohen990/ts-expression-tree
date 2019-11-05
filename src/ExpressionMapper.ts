import { Expression } from "./Expression";

const knownMappings = {
  "": "empty",
  return: "return"
};

export const mapExpression = (expressionText: string): Expression => {
  if (expressionText.indexOf(" ")) {
    if (expressionText.indexOf('"') >= 0) {
      return returnStringExpression(expressionText);
    }
    const split = expressionText.split(" ");
    if (knownMappings[split[0]]) {
      let child;
      if (split.indexOf("+") >= 0) {
        return operationExpression(split, child);
      } else {
        child = Expression.numberConstant(split[1]);
        return new Expression(knownMappings[split[0]], [child]);
      }
    }
  }

  if (knownMappings[expressionText]) {
    return new Expression(knownMappings[expressionText]);
  }
  return Expression.invalid();
};

function operationExpression(split: string[], child: any) {
  const augend = Expression.numberConstant(split[1]);
  const addend = Expression.numberConstant(split[3]);
  child = Expression.operation(split[2], augend, addend);
  return new Expression(knownMappings[split[0]], [child]);
}

function returnStringExpression(expressionText: string) {
  const firstSplit = expressionText.split('"');
  const returnStatement = firstSplit[0].trim();
  const child = Expression.stringConstant(firstSplit[1]);
  return new Expression(knownMappings[returnStatement], [child]);
}
