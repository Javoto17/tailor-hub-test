import * as Keychain from 'react-native-keychain';

export interface StorageRepository {
  get: (name: string) => Promise<Keychain.UserCredentials | null>;
  set: (name: string, value: string) => Promise<boolean>;
  delete: (name: string) => Promise<boolean>;
}
