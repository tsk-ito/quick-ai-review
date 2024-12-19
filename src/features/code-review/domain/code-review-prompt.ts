import { Rule } from "./rule";

export class CodeReviewPrompt {
  constructor(
    public readonly sourceCode: string,
    public readonly rules: Rule[] = []
  ) {}

  private reviewString = () => {
    const reviewPoint1 =
      "If you notice any areas for improvement in the code, please point them out.";
    const reviewPoint2 =
      "If there are any unnecessary codes, please point them out.";

    const reviewPoint3 =
      "Please reply strictly in the following JSON format." +
      "{\n" +
      '    "security_risks": "high" or "mid" or "low" or "none",\n' +
      '    "source_code_quality": "high" or "mid" or "low",\n' +
      '    "unnecessary_code_exists": true or false,\n' +
      '    "comment": "your review comment about 2 sentences"\n' +
      "}";

    return `Please review the following points.\n- ${reviewPoint3}\n---\n`;
  };

  private ruleString = () => {
    if (this.rules.length === 0) {
      return "";
    }

    return (
      "Please follow these rules.\n" +
      this.rules.reduce<string>(
        (rules, rule) => rules + `- ${rule.toString()}\n`,
        ""
      ) +
      "---\n"
    );
  };

  toString = () =>
    this.ruleString() +
    this.reviewString() +
    "\n--- Below is the source code. ---\n" +
    this.sourceCode;
}
