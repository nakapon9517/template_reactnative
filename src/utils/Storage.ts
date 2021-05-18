// import Storage from 'react-native-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stringify, parse } from 'telejson';

export enum StorageName {
  MEMO_LIST = 'memolist',
}
// const storage: Storage = new Storage({
//   // 最大容量
//   size: 1000,
//   // バックエンドにAsyncStorageを使う
//   storageBackend: AsyncStorage,
//   // キャッシュ期限(null=期限なし)
//   defaultExpires: null,
//   // メモリにキャッシュするかどうか
//   enableCache: true,
// });

// export default storage;

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
