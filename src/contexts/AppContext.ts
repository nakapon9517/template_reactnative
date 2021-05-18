import { createContext } from 'react';
import { Memo, Calc, Grid, Category } from '@/entities';

type ContextProps = {
  memos?: Memo[];
  setMemos: (memo?: Memo[]) => void;
  calcs?: Calc[];
  setCalcs: (calc?: Calc[]) => void;
  calcCategories?: Category[];
  setCalcCategory: (categories?: Category[]) => void;
  grids?: Grid[];
  setGrids: (grid?: Grid[]) => void;
};

export default createContext<ContextProps>({
  setMemos: () => {},
  setCalcs: () => {},
  setCalcCategory: () => {},
  setGrids: () => {},
});
