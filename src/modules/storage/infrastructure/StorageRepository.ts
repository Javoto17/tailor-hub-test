import AsyncStorage from '@react-native-async-storage/async-storage';

import { StorageRepository } from '../domain/StorageRepository';

const PREFIX = '@tailor-';

export function generateStorageRepository(): StorageRepository {
  return {
    set: async (name, value) => {
      try {
        await AsyncStorage.setItem(`${PREFIX}${name}`, value);
        return true;
      } catch (e) {
        console.log(`Error on setting ${`${PREFIX}${name}`}`);
        return false;
      }
    },
    get: async (name) => {
      try {
        const value = await AsyncStorage.getItem(`${PREFIX}${name}`);

        if (value === null) {
          return null;
        }

        return value;
      } catch (e) {
        console.log(`Error on getting ${`${PREFIX}${name}`}`);
        return null;
      }
    },
    delete: async (name) => {
      try {
        await AsyncStorage.removeItem(`${PREFIX}${name}`);
        return true;
      } catch (e) {
        console.log(`Error on deleting ${`${PREFIX}${name}`}`);
        return false;
      }
    },
  };
}
