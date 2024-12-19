import * as vscode from "vscode";
import { executeCodeReview } from "../features/code-review";

export const startCodeReviewCommand = vscode.commands.registerCommand(
  "quick-ai-review.startCodeReview",
  async (args: any) => {
    if (!args || !(typeof args === "object")) {
      return;
    }

    const sourceCode = Object.hasOwn(args, "sourceCode")
      ? (args.sourceCode ?? "")
      : "";

    const lineCount = Object.hasOwn(args, "lineCount")
      ? (args.lineCount ?? 0)
      : 0;

    const relativePath = args.relativePath ?? "";

    if (sourceCode.length > 0 && lineCount > 0) {
      executeCodeReview(sourceCode, lineCount, relativePath);
    }
  }
);
