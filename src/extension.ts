// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { startCodeReviewCommand } from "./commands";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(startCodeReviewCommand);

  vscode.workspace.onDidSaveTextDocument(async (document) => {
    vscode.commands.executeCommand("quick-ai-review.startCodeReview", {
      sourceCode: document.getText(),
      lineCount: document.lineCount,
      relativePath: vscode.workspace.asRelativePath(document.fileName),
    });
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
