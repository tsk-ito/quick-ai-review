export class ReviewTargetDirectoryMismatchError extends Error {
  constructor(
    public readonly sourceDirectory: string,
    public readonly expectedDirectory: string
  ) {
    super(
      `The source directory '${sourceDirectory}' does not match the expected review target directory '${expectedDirectory}'`
    );
    this.name = "ReviewTargetDirectoryMismatchError";
  }
}
