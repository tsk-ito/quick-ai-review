import { Model } from "./model";

export class Prompt {
  constructor(
    public readonly message: string,
    public readonly model: Model
  ) {}
}
