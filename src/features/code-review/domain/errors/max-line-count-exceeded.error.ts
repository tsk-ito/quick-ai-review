export class MaxLineCountExceededError extends Error {
  constructor(
    public readonly lineCount: number,
    public readonly maxLineCount: number
  ) {
    super(
      `The maximum line count of ${maxLineCount} has been exceeded. Current line count: ${lineCount}`
    );
    this.name = "MaxLineCountExceededError";
  }
}
