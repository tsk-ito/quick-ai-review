import { getUserSettingsUseCase } from "../shared/user-settings";
import { SendPromptUseCase } from "./application";
import { PromptSender } from "./inftastcucture";

export const chat = async (
  prompt: string
): Promise<{ message: string; error: boolean }> => {
  if (prompt.length === 0) {
    return { message: "", error: true };
  }

  const promptSender = new PromptSender();
  const useCase = new SendPromptUseCase(getUserSettingsUseCase, promptSender);

  return useCase.execute(prompt);
};
