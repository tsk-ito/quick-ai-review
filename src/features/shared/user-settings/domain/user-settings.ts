export interface IUserSettings {
  replyLanguage: string;
  modelName: string | undefined;
  provider: string;
  reviewerAssistantUrl: string;
  maxLineCount: number;
  reviewTargetDir: string;
}
