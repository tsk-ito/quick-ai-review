export class InvalidModelNameError extends Error {
  constructor(
    message: string = "The model name is missing. Please set a valid model name."
  ) {
    super(message);

    this.name = "InvalidModelNameError";
  }
}
