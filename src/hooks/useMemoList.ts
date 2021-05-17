import { Memo, Category } from '@/entities';

const useMemoList = () => {
  const memos: Memo[] = [];
  const data = () => {
    for (let i = 0; i < 40; i++) {
      const item: Memo = {
        title: 'category_' + String(i),
        text: 'text_' + i,
        update: new Date(),
      };
      memos.push(item);
    }
  };
  data();

  return { memos };
};

export { useMemoList };
