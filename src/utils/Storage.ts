import AsyncStorage from '@react-native-async-storage/async-storage';
import { stringify, parse } from 'telejson';

export enum StorageName {
  MEMO_LIST = '@memo_list',
  CALC_LIST = '@calc_list',
  CALC_CATEGORY = '@calc_category',
  GRID_LIST = '@grid_list',
  GRID_CATEGORY = '@grid_category',
}
export class Storage<T> {
  async save(key: string, value: T) {
    const jsonValue = stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  }

  async get(key: string) {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? parse(jsonValue) : undefined;
  }
}
