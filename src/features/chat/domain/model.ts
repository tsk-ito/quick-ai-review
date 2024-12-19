import { InvalidModelNameError } from "./invalid-model-name.error";

export class Model {
  constructor(public readonly name: string) {
    if (name.length === 0) {
      throw new InvalidModelNameError();
    }
  }
}
