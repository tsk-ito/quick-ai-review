import { InvalidReplyFormatError } from "./errors";
import { IReplyFormat } from "./reply-format.interface";
import { ReviewScore } from "./review-score";

export class ReviewReply {
  public readonly content: string;
  public readonly result: IReplyFormat;
  public readonly reviewScore: ReviewScore;

  constructor(content: string) {
    try {
      this.content = content.replace(/```json([\s\S]+)```/, "$1");
      this.result = JSON.parse(this.content) as IReplyFormat;

      if (
        this.result.security_risks === "high" ||
        this.result.source_code_quality === "low"
      ) {
        this.reviewScore = ReviewScore.Critical;
      } else if (
        this.result.security_risks === "mid" ||
        this.result.source_code_quality === "mid"
      ) {
        this.reviewScore = ReviewScore.Warn;
      } else {
        this.reviewScore = ReviewScore.NoProblem;
      }
    } catch (_) {
      throw new InvalidReplyFormatError();
    }
  }
}
