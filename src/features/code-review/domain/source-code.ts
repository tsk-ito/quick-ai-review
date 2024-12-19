export class SourceCode {
  constructor(
    public readonly content: string,
    public readonly lineCount: number,
    public readonly relativePath: string
  ) {}

  isEmpty = () => this.content.length === 0;
}
