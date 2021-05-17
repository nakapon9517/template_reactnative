import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

//ストレージの作成
const storage: Storage = new Storage({
  // 最大容量
  size: 1000,
  // バックエンドにAsyncStorageを使う
  storageBackend: AsyncStorage,
  // キャッシュ期限(null=期限なし)
  defaultExpires: null,
  // メモリにキャッシュするかどうか
  enableCache: true,
});

// // ストレージに保存
// const save = () => {
//   storage.save({
//     key: 'ZENN',
//     data: {
//       col1: 'hoge',
//       col2: 100,
//     },
//   });
// };

// const load = () => {
//   // storage.load({
//   //   key : 'ZENN'
//   // }).then(data : { col1: string, col2: number } => {
//   //   // 読み込み成功時処理
//   //   console.log(data); // --> { col1: 'hoge', col2: 100 }
//   // }).catch(err => {
//   //   // 読み込み失敗時処理
//   //   console.log('load failed.');
//   // });
// }

// const delete = () => {
//   storage.remove({
//     key : 'ZENN'
//   });
// }
