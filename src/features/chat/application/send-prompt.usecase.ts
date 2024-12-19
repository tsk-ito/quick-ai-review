import { Logger } from "../../../utils/logging";
import { IGetUserSettingsUseCase } from "../../shared/user-settings";
import { Model, Prompt } from "../domain";
import { IPromptSender } from "./prompt-sender.interface";

export class SendPromptUseCase {
  constructor(
    private readonly getUserSettingsUseCase: IGetUserSettingsUseCase,
    private readonly sender: IPromptSender
  ) {}

  execute = async (
    promptMessage: string
  ): Promise<{ message: string; error: boolean }> => {
    try {
      const userSettings = this.getUserSettingsUseCase.execute();
      const prompt = new Prompt(
        promptMessage,
        new Model(userSettings.modelName ?? "")
      );

      Logger.info("Sending prompt...");

      return await this.sender.sendPrompt(prompt).then((reply) => {
        Logger.info("Prompt sent successfully.");
        return {
          message: reply.message,
          error: false,
        };
      });
    } catch (e: unknown) {
      Logger.unknownError(e);
      if (e instanceof Error) {
        return {
          error: true,
          message: e.message || "An unknown error occurred",
        };
      } else {
        return { error: true, message: "An unknown error occurred" };
      }
    }
  };
}
