import { ConciseCodeReviewUseCase } from "./application";
import * as vscode from "vscode";
import { ReviewScore } from "./domain/review-score";
import { getUserSettingsUseCase } from "../shared/user-settings";

export const executeCodeReview = async (
  sourceCode: string,
  lineCount: number,
  relativePath: string
) => {
  const useCase = new ConciseCodeReviewUseCase(getUserSettingsUseCase);

  const res = await useCase.execute(sourceCode, lineCount, relativePath);
  if (res.isError) {
    if (res.needsNortice && res.message.length > 0) {
      vscode.window.showErrorMessage(res.message);
    }
  } else {
    if (res && res.comment.length > 0) {
      switch (res.reviewScore) {
        case ReviewScore.Critical:
          vscode.window.showErrorMessage(res.comment);
          break;
        case ReviewScore.Warn:
          vscode.window.showWarningMessage(res.comment);
          break;
        case ReviewScore.NoProblem:
          vscode.window.showInformationMessage(res.comment);
          break;
      }
    }
  }
};
