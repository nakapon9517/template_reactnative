import { useContext } from 'react';
import AppContext from '@/contexts/AppContext';
import { Memo } from '@/entities';
import { Storage, StorageName } from '@/utils';

export const useMemoList = () => {
  const { memos, setMemos } = useContext(AppContext);

  const setMemoList = (memos: Memo[]) => {
    const storage = new Storage<Memo[]>();
    storage.save(StorageName.MEMO_LIST, memos);
    setMemos(memos);
  };

  return { memos, setMemos, setMemoList };
};
