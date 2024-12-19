import { IUserSettings } from "../domain";
import { IUserSettingsRepository } from "./user-settings.repository.interface";

export class GetUserSettingsUseCase {
  constructor(private readonly repository: IUserSettingsRepository) {}

  execute = (): IUserSettings => this.repository.get();
}
