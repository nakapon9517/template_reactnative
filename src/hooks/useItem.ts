import { Item } from '@/entities';
import { Require } from '@/constants';
import { useCategories } from '@/hooks/useCategories';

export const useItem = () => {
  const categories = useCategories();

  const items: Item[] = [];
  const data = () => {
    for (let i = 0; i < 40; i++) {
      //160
      const item: Item = {
        id: `test_${i}`,
        name: String('text' + i + '_'),
        count: i,
        money: Number(i),
        category: i % categories.length,
        date: new Date(),
        uri: Require[i % Require.length],
      };
      items.push(item);
    }
  };
  data();

  return { items };
};
