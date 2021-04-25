import { Item } from '@/entities';
import { Require } from '@/constants';

export const useCategories = () => {
  const categories: string[] = [
    'First',
    'Second',
    'Third',
    'Four',
    'Five',
    'Six',
    'Seven',
  ];

  return categories;
};
