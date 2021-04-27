import { Item } from '@/entities';
import { Require } from '@/constants';

export const useImageCategories = () => {
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
