import { Expression } from "./Expression";
import { Value } from "./Value";

const knownMappings = {
    "": "empty",
    "return": "return"
};
export const mapExpression = (expressionText: string): Expression => {
    if (expressionText.indexOf(' ')) {
        const firstSplit = expressionText.split('"');
        if (firstSplit.length > 1) {
            const returnStatement = firstSplit[0].trim();
            const child = new Expression("constant", undefined, new Value("string", firstSplit[1]));
            return new Expression(knownMappings[returnStatement], [child]);
        }
        const split = expressionText.split(' ');
        if (knownMappings[split[0]]) {
            const child = new Expression("constant", undefined, new Value("number", split[1]));
            return new Expression(knownMappings[split[0]], [child]);
        }
    }
    if (knownMappings[expressionText]) {
        return new Expression(knownMappings[expressionText]);
    }
    return new Expression("invalid");
};
