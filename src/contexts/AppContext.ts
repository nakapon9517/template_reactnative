import { createContext } from 'react';
// import { StarConnectionSettings } from 'react-native-star-io10';
import { Memo, Item } from '@/entities';
// import { NotificationType } from '@/components';

type ContextProps = {
  memos?: Memo[];
  setMemos: (memo?: Memo[]) => void;
  items?: Item[];
  setItems: (item?: Item[]) => void;
};

export default createContext<ContextProps>({
  setMemos: () => {},
  setItems: () => {},
});
