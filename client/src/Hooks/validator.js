class formValidator {
  type = undefined;
  min = undefined;
  max = undefined;
  constructor() {
    this.type = undefined;
    this.min = undefined;
    this.max = undefined;
  }
  string() {
    this.type = typeof "";
    return this;
  }
  int() {
    this.type = typeof 1;
    return this;
  }
  minimum(m) {
    this.min = Number(m);
    return this;
  }
  maximum(m) {
    this.max = Number(m);
    return this;
  }
  print() {
    return `type ${this.type} =>${this.minimum}-${this.maximum}`;
  }
}

export default formValidator;
