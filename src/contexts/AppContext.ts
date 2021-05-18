import { createContext } from 'react';
import { Memo, Calc, Grid } from '@/entities';

type ContextProps = {
  memos?: Memo[];
  setMemos: (memo?: Memo[]) => void;
  calcs?: Calc[];
  setCalcs: (calc?: Calc[]) => void;
  grids?: Grid[];
  setGrids: (grid?: Grid[]) => void;
};

export default createContext<ContextProps>({
  setMemos: () => {},
  setCalcs: () => {},
  setGrids: () => {},
});
