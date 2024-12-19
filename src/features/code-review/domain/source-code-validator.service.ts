import { IUserSettings } from "../../shared/user-settings/domain";
import {
  MaxLineCountExceededError,
  ReviewTargetDirectoryMismatchError,
} from "./errors";
import { SourceCode } from "./source-code";

export class SourceCodeValidatorService {
  public static executeSourceCodeValidation = (
    sourceCode: SourceCode,
    userSettings: IUserSettings
  ) => {
    if (!this.isValidLineCount(sourceCode, userSettings)) {
      throw new MaxLineCountExceededError(
        sourceCode.lineCount,
        userSettings.maxLineCount
      );
    }
    if (!this.isValidRelativePath(sourceCode, userSettings)) {
      throw new ReviewTargetDirectoryMismatchError(
        sourceCode.relativePath,
        userSettings.reviewTargetDir
      );
    }
  };

  private static isValidLineCount = (
    sourceCode: SourceCode,
    userSettings: IUserSettings
  ) => sourceCode.lineCount <= userSettings.maxLineCount;

  private static isValidRelativePath = (
    sourceCode: SourceCode,
    userSettings: IUserSettings
  ) => sourceCode.relativePath.startsWith(userSettings.reviewTargetDir);
}
