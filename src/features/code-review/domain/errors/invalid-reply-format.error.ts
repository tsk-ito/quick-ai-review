export class InvalidReplyFormatError extends Error {
  constructor(
    message: string = "The reply format is not valid. Please try changing the model if the issue persists."
  ) {
    super(message);
    this.name = "InvalidReplyFormatError";
  }
}
