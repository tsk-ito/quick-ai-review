import { GetUserSettingsUseCase } from "./application";
import { UserSettingsRepository } from "./repository";

export * from "./domain";

export const getUserSettingsUseCase = new GetUserSettingsUseCase(
  new UserSettingsRepository()
);

export interface IGetUserSettingsUseCase extends GetUserSettingsUseCase {}
