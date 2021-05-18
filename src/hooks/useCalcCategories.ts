import { useContext } from 'react';
import AppContext from '@/contexts/AppContext';
import { Category } from '@/entities';
import { Storage, StorageName } from '@/utils';

export const useCalcCategories = () => {
  const { calcCategories, setCalcCategory } = useContext(AppContext);

  const setCalcCategoryList = (categoryies: Category[]) => {
    const storage = new Storage<Category[]>();
    storage.save(StorageName.CALC_CATEGORY, categoryies);
    setCalcCategory(categoryies);
  };

  return { calcCategories, setCalcCategory, setCalcCategoryList };
};
