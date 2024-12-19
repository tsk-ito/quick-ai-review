export class Reply {
  constructor(
    public readonly message: string,
    public readonly isDone: boolean
  ) {}

  static emptyReply = () => new Reply("", true);
}
