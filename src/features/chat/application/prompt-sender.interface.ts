import { Prompt, Reply } from "../domain";

export interface IPromptSender {
  sendPrompt(prompt: Prompt): Promise<Reply>;
}
