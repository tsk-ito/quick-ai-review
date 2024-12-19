import { Logger } from "../../../utils/logging";
import { chat } from "../../chat";
import { IGetUserSettingsUseCase } from "../../shared/user-settings";
import * as domain from "../domain";

interface ReviewResult extends domain.IReplyFormat {
  reviewScore: domain.ReviewScore;
  isError: false;
}

type ResponseType = Promise<
  ReviewResult | { message: string; isError: true; needsNortice: boolean }
>;

export class ConciseCodeReviewUseCase {
  constructor(
    private readonly getUserSettingsUseCase: IGetUserSettingsUseCase
  ) {}

  execute = async (
    sourceCode: string,
    lineCount: number,
    relativePath: string
  ): Promise<ResponseType> => {
    try {
      const reviewTarget = new domain.SourceCode(
        sourceCode,
        lineCount,
        relativePath
      );

      const userSettings = this.getUserSettingsUseCase.execute();

      // Throw any error if the source code invalid.
      domain.SourceCodeValidatorService.executeSourceCodeValidation(
        reviewTarget,
        userSettings
      );

      const codeReviewPrompt = new domain.CodeReviewPrompt(sourceCode, [
        domain.Rule.twoSentencesOrLess(),
        domain.Rule.replyInUsersLanguage(userSettings.replyLanguage),
      ]);

      const response = await chat(codeReviewPrompt.toString());
      if (response.error) {
        return {
          isError: true,
          message: response.message,
          needsNortice: true,
        };
      }

      const reply = new domain.ReviewReply(response.message);

      return {
        ...reply.result,
        reviewScore: reply.reviewScore,
        isError: false,
      };
    } catch (e: unknown) {
      Logger.unknownError(e);

      if (
        e instanceof domain.MaxLineCountExceededError ||
        e instanceof domain.InvalidReplyFormatError
      ) {
        return {
          message: e.message,
          isError: true,
          needsNortice: true,
        };
      }

      const errorMessage = e instanceof Error ? e.message : "Unknown Error";

      return {
        message: errorMessage,
        isError: true,
        needsNortice: false,
      };
    }
  };
}
