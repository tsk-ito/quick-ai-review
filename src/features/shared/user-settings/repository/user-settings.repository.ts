import * as vscode from "vscode";
import iso6391 from "iso-639-1";
import { IUserSettings } from "../domain";
import { IUserSettingsRepository } from "../application";

export class UserSettingsRepository implements IUserSettingsRepository {
  /**
   * Get user settings
   *
   * @returns Users lanugage name in English
   */
  get = (): IUserSettings => {
    const config = vscode.workspace.getConfiguration("quick-ai-review");

    const settings: IUserSettings = {
      replyLanguage: iso6391.getName(config.get<string>("replyLanguage", "en")),
      modelName: config.get<string | undefined>("modelName", undefined),
      provider: "Ollama",
      reviewerAssistantUrl: config.get<string>(
        "reviewerAssistantUrl",
        "http://localhost:11434"
      ),
      maxLineCount: config.get<number>("maxLineCount", 150),
      reviewTargetDir: config.get<string>("reviewTargetDir", ""),
    };
    return settings;
  };
}
