import { Item, Category } from '@/entities';
import { Require } from '@/constants';
import { useItemCategories } from '@/hooks';

interface Props {
  categories: Category[];
}
export const useItem = (props: Props) => {
  const items: Item[] = [];
  const data = () => {
    for (let i = 0; i < 40; i++) {
      const item: Item = {
        id: `test_${i}`,
        name: String('text' + i + '_'),
        count: i,
        price: i * 1010000,
        category: (i % props.categories.length) + 1,
        date: new Date(),
        uri: Require[i % Require.length],
      };
      items.push(item);
    }
  };
  data();

  return { items };
};
