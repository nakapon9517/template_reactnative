import { Memo } from '@/entities';
import { Storage, StorageName } from '@/utils/Storage';
import { stringify, parse } from 'telejson';

const useMemoList = async () => {
  const storage = new Storage<Memo[]>();
  let memos: Memo[] = [];
  await storage.get(StorageName.MEMO_LIST).then((settings) => {
    memos = settings;
  });
  // let memos: Memo[] = await storage
  //   .load({ key: StorageName.MEMO_LIST, syncInBackground: false })
  //   .then((results) => {
  //     return parse(results) as Memo[];
  //   });
  return { memos };
};

export { useMemoList };
