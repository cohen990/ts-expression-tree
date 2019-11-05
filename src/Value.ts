export type ValueType = "number" | "string" | "operator" | "name";
export class Value {
  type: ValueType;
  value: any;
  constructor(type: ValueType, value: any) {
    this.type = type;
    this.value = value;
  }
}
