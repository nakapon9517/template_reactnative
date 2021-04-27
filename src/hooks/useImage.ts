import { Item } from '@/entities';
import { Require } from '@/constants';
import { useImageCategories } from '@/hooks';

const useImage = () => {
  const categories = useImageCategories();

  const items: Item[] = [];
  const data = () => {
    for (let i = 0; i < 40; i++) {
      const item: Item = {
        id: `test_${i}`,
        name: String('text' + i + '_'),
        count: i * 10,
        // price: i * 1010000,
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

export { useImage };
