import { useContext } from 'react';
import AppContext from '@/contexts/AppContext';

export const useMemoList = () => {
  const { memos, setMemos } = useContext(AppContext);
  return { memos, setMemos };
};
