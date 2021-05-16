import { Memo, Category } from '@/entities';

const useMemoList = () => {
  const memos: Memo[] = [];
  const data = () => {
    for (let i = 0; i < 40; i++) {
      const item: Memo = {
        text: 'text_' + i,
        update: new Date(),
        category: {
          id: i,
          title: i % 3 === 0 ? 'category_' + String(i) : String(i),
        },
      };
      memos.push(item);
    }
  };
  data();

  return { memos };
};

export { useMemoList };
