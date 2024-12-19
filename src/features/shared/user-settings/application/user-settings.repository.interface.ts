import { IUserSettings } from "../domain";

export interface IUserSettingsRepository {
  get: () => IUserSettings;
}
