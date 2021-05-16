import { Item, Category } from '@/entities';
import { Require } from '@/constants';
import { useImageCategories } from '@/hooks';

interface Props {
  categories: Category[];
}
const useImage = (props: Props) => {
  const items: Item[] = [];
  const data = () => {
    for (let i = 0; i < 40; i++) {
      const item: Item = {
        id: `test_${i}`,
        name: String('text' + i + '_'),
        count: i * 10,
        // price: i * 1010000,
        category: i % props.categories.length,
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
