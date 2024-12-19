export class Rule {
  constructor(public readonly context: string) {}

  static replyInUsersLanguage = (languageName: string) =>
    new Rule(`Reply in ${languageName}.`);

  static twoSentencesOrLess = () => new Rule("Reply in two sentences or less.");

  toString = () => this.context;
}
